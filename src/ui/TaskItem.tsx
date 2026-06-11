import type { GlobalTaskListItemJsonApiData } from '../dal/api';
import styles from './TaskItem.module.css'
import clsx from 'clsx';

type Props = {
	task: GlobalTaskListItemJsonApiData;
	isSelected: boolean;
	onTaskSelected: (id: string) => void
}

function TaskItem({task, isSelected, onTaskSelected}: Props) {

	const priorityClass = styles[`priority${task.attributes.priority}`] || styles.priorityDefault
	const taskClassName = clsx(styles.task, priorityClass, {
		[styles.selected]: isSelected
	})
 
	const titleClassName = clsx(styles.taskTitle, {
		[styles.taskStatusSelected]: (task.attributes.status === 2)
	})
	
	return(
	<div key={task.id} className={taskClassName}>
		<div onClick={() => onTaskSelected?.(task.id)}> 
			
			<h5>Заголовок: <span
				className={titleClassName}
			>{task.attributes.title}</span> </h5>
			
			<form>
				<label htmlFor='isChecked'>статус </label>
				<input
					id='isChecked'
					type='checkbox'
					defaultChecked={task.attributes.status === 2}></input>
			</form>
			
			<p>
			<b>дата створення завдання</b>: {new Date(task.attributes.addedAt).toLocaleDateString()}
			</p>
		</div>
    </div>)
}

export default TaskItem