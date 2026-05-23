import { useEffect, useState } from 'react'
 
export function App() {
  const [tasks, setTasks] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [boardId, setBoardId] = useState(null)

  useEffect(() => {
    fetch('https://trelly.it-incubator.app/api/1.0/boards/tasks', {
      headers: {
        "api-key": "84c469a1-98df-4d87-94d9-1a68388c760e"
      },
    })
      .then(res => res.json())
      .then(data => setTasks(data.data))
      .catch(e => console.error(e));
  }, [])

  useEffect(() => {
    if (selectedTaskId === null) return;
    fetch(`https://trelly.it-incubator.app/api/1.0/boards/${boardId}/tasks/${selectedTaskId}`, {
      headers: {
        "api-key": "84c469a1-98df-4d87-94d9-1a68388c760e",
      },
    })
      .then(res => res.json())
      .then(data => setSelectedTask(data.data))
      .catch(e => console.error(e));
  }, [selectedTaskId, boardId])

	if (tasks === null) {
		return (<div>Загрузка...</div>)
	}

	if (tasks.length === 0) {
		return (<div>Задачи отсутствуют</div>)
	}

  const colors = (priority) => {
    switch (priority) {
      case 0: return '#ffffff';
      case 1: return '#ffd7b5';
      case 2: return '#ffb38a';
      case 3: return '#ff9248';
      case 4: return '#ff6700';
      default: return '#333'
    }
  }
  
	return (
    <div>
      <button onClick={() => { return setSelectedTaskId(null), setSelectedTask(null) }}>Сбросить выделение</button>
      <div style={{display: 'flex'}}>
        <div>
          {tasks.map((task) => {
            return (
              <div key={task.id} style={{ display: 'flex', gap: '50px'}}>
                <div
                  style={{
                    backgroundColor: colors(task.attributes.priority),
                    padding: '15px 15px',
                    margin: '10px',
                    border: task.id === selectedTaskId ? '3px solid blue': '1px solid black'
                  }}
                  onClick={() => { return setSelectedTaskId(task.id), setBoardId(task.attributes.boardId) }}>
                  
                  <h5>Заголовок: <span style={{ textDecoration: task.attributes.status === 2 ? 'line-through' : 'none' }}>{task.attributes.title}</span> </h5>
                  
                  <form>
                    <label htmlFor='isChecked'>статус </label>
                    <input
                      id='isChecked'
                      type='checkbox'
                      defaultChecked={task.attributes.status === 2}></input>
                  </form>
                  
                  <p>
                    <b>дата создания задачи</b>: {new Date(task.attributes.addedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          )}
        </div>
        <div style={{border: '1px solid', padding: '25px', minWidth: '300px'}}>
          <h5>Task details</h5>
      
          <div>
            {selectedTask ?
              <ul >
                <li>title - {selectedTask.attributes.title}</li>
                <li>boardTitle - {selectedTask.attributes.boardTitle}</li>
                <li>description - {selectedTask.attributes.description}</li>
              </ul>
              :
              <div>
                {(selectedTaskId && !selectedTask) ? <p>loading</p> : <p>Task is not selected</p>}
              </div>
            }
          </div>
        </div>
      </div>
		</div>
  )
}