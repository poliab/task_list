import { useState, useEffect } from 'react';
import { type GlobalTaskListItemJsonApiData, getTasks } from '../dal/api';


export function useTasks() {
	const [tasks, setTasks] = useState<Array<GlobalTaskListItemJsonApiData> | null>(null);

	useEffect(() => {
		getTasks()
			.then(data => setTasks(data.data))
			.catch(e => console.error(e));
	}, []);
	return {
		tasks
	};
}
