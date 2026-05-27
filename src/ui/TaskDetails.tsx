import { useEffect, useState } from 'react';
import { getTrack } from '../dal/api';

type TaskDetailsData = {
  id: string;
  attributes: {
    title: string | null;
    boardTitle: string;
    description: string;
  };
};

type Props = {
  selectedTaskId: string | null;
  boardId: string | null;
};

export function TaskDetails({ selectedTaskId, boardId }: Props) {
  const [selectedTask, setSelectedTask] = useState<TaskDetailsData | null>(null);

  useEffect(() => {
    if (!selectedTaskId || !boardId) return;

    let cancelled = false;

    const promise = getTrack(boardId, selectedTaskId)
   
    promise.then(data => {
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

  const visibleTask =
    selectedTaskId && selectedTask?.id === selectedTaskId
      ? selectedTask
      : null;

  return (
    <div style={{ border: '1px solid', padding: '25px', minWidth: '300px' }}>
      <h5>Task details</h5>

      {!selectedTaskId && <p>Task is not selected</p>}
      {selectedTaskId && !visibleTask && <p>loading</p>}

      {visibleTask && (
        <ul>
          <li>title - {visibleTask.attributes.title ?? 'no title'}</li>
          <li>boardTitle - {visibleTask.attributes.boardTitle}</li>
          <li>description - {visibleTask.attributes.description}</li>
        </ul>
      )}
    </div>
  );
}
