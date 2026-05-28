import { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import { getTasks, type GlobalTaskListItemJsonApiData } from '../dal/api';

type Props = {
	selectedTaskId: string | null;
	onTaskSelected: (id: string | null) => void
}

export function TasksList({selectedTaskId, onTaskSelected}: Props) {
	const [tasks, setTasks] = useState<Array<GlobalTaskListItemJsonApiData> | null>(null);

	useEffect(() => {
		getTasks()
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