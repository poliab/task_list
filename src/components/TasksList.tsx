import { useEffect, useState } from 'react';
import TaskItem, { type GlobalTaskListItemJsonApiData } from './TaskItem';

type Props = {
	selectedTaskId: string | null;
	onTaskSelected: (id: string | null) => void
}

export function TasksList({selectedTaskId, onTaskSelected}: Props) {
	const [tasks, setTasks] = useState<Array<GlobalTaskListItemJsonApiData> | null>(null);

	useEffect(() => {
		fetch('https://trelly.it-incubator.app/api/1.0/boards/tasks', {
			headers: {
			// "api-key": "84c469a1-98df-4d87-94d9-1a68388c760e", // mine
			"api-key": "75f7f7c7-61ad-44af-8de5-fb6f0f1975ab",
		},
		})
		.then(res => res.json())
		.then(data => setTasks(data.data))
		.catch(e => console.error(e));
	}, [])

	if (tasks === null) {
		return (<div>Завантаження...</div>)
	}

	if (tasks.length === 0) {
		return (<div>Завдань немає</div>)
	}

	const handleResetClick = () => {
		onTaskSelected?.(null)
	}

	return <div>
		<button onClick={handleResetClick}>reset</button>
        {tasks.map((task) => {
            return ( 
				<TaskItem
					key={task.id}
					task={task}
					isSelected={task.id === selectedTaskId}
            		onTaskSelected={onTaskSelected}
				/>
            )}
        )}
    </div>
}