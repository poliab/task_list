import { useEffect, useState } from 'react';

export function TaskDetails(props) {
	const [selectedTask, setSelectedTask] = useState(null);
	
	useEffect(() => {
		if (props.selectedTaskId === null) {
			setSelectedTask(props.selectedTaskId)
			return;
		}
		console.log('Fetch started')
		fetch(`https://trelly.it-incubator.app/api/1.0/boards/${props.boardId}/tasks/${props.selectedTaskId}`, {
		  headers: {
			// "api-key": "84c469a1-98df-4d87-94d9-1a68388c760e",
			"api-key": "75f7f7c7-61ad-44af-8de5-fb6f0f1975ab",
		  },
		})
			.then(res => {
				if (!res.ok) {
        		console.error('Ошибка:', res.status);
        		return;
     		    }
				return res.json()
			})
		  .then(data => setSelectedTask(data.data))
		  .catch(e => console.error(e));
	}, [props.selectedTaskId, props.boardId])

	return (
	<div style={{ border: '1px solid', padding: '25px', minWidth: '300px' }}>
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
				{(selectedTask && !selectedTask) ? <p>loading</p> : <p>Task is not selected</p>}
				</div>
			}
		</div>
    </div>)
}