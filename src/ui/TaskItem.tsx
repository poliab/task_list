import type { GlobalTaskListItemJsonApiData } from '../dal/api';


type Props = {
	task: GlobalTaskListItemJsonApiData;
	isSelected: boolean;
	onTaskSelected: (id: string) => void
}

function TaskItem({task, isSelected, onTaskSelected}: Props) {

	const colors = (priority: number): string => {
		switch (priority) {
		case 0: return '#ffffff';
		case 1: return '#ffd7b5';
		case 2: return '#ffb38a';
		case 3: return '#ff9248';
		case 4: return '#ff6700';
		default: return '#333'
		}
	}
	
	return(
	<div key={task.id} style={{ display: 'flex', gap: '50px'}}>
		<div
			style={{
			backgroundColor: colors(task.attributes.priority),
			padding: '15px 15px',
			margin: '10px',
			border: isSelected ? '3px solid blue' : '1px solid black'
			}}
			onClick={() => {
				return (
					onTaskSelected?.(task.id)
				)
			}}
		> 
			
			<h5>Заголовок: <span style={{ textDecoration: task.attributes.status === 2 ? 'line-through' : 'none' }}>{task.attributes.title}</span> </h5>
			
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