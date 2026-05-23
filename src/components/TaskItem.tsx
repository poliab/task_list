
function TaskItem(props) {

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
	<div key={props.task.id} style={{ display: 'flex', gap: '50px'}}>
		<div
			style={{
			backgroundColor: colors(props.task.attributes.priority),
			padding: '15px 15px',
			margin: '10px',
			border: props.isSelected ? '3px solid blue' : '1px solid black'
			}}
			onClick={() => {
				return (
					props.onTaskSelected?.(props.task.id)
				)
			}}
		> 
			
			<h5>Заголовок: <span style={{ textDecoration: props.task.attributes.status === 2 ? 'line-through' : 'none' }}>{props.task.attributes.title}</span> </h5>
			
			<form>
			<label htmlFor='isChecked'>статус </label>
			<input
				id='isChecked'
				type='checkbox'
				defaultChecked={props.task.attributes.status === 2}></input>
			</form>
			
			<p>
			<b>дата створення завдання</b>: {new Date(props.task.attributes.addedAt).toLocaleDateString()}
			</p>
		</div>
    </div>)
}

export default TaskItem