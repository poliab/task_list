import TaskItem from './TaskItem';
import { useTasks } from '../bll/useTasks';

type Props = {
	selectedTaskId: string | null;
	onTaskSelected: (id: string | null) => void
}

export function TasksList({selectedTaskId, onTaskSelected}: Props) {
	const { tasks } = useTasks()
	
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