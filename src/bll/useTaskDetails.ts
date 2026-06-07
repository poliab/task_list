import { useState, useEffect } from 'react';
import { type TaskDetailsData, getTask } from '../dal/api';


export function useTaskDetails(selectedTaskId: string | null, boardId: string | null) {
  const [taskDetails, setSelectedTask] = useState<TaskDetailsData | null>(null);

  useEffect(() => {
    if (!selectedTaskId || !boardId) return;

    let cancelled = false;

    getTask(boardId, selectedTaskId)
      .then(data => {
        if (!cancelled) {
          setSelectedTask(data.data);
        }
      })
      .catch(err => {
        console.error(err);
        if (!cancelled) {
          setSelectedTask(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [selectedTaskId, boardId]);

  return {
    taskDetails
  };
}
