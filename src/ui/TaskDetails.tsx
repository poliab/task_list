import { useTaskDetails } from '../bll/useTaskDetails';
import styles from './TaskDetails.module.css'

type Props = {
  selectedTaskId: string | null;
  boardId: string | null;
};

export function TaskDetails(props: Props) {
  const { selectedTaskId, boardId } = props;
  const { taskDetails } = useTaskDetails(selectedTaskId, boardId)

  const visibleTask =
    selectedTaskId && taskDetails?.id === selectedTaskId
      ? taskDetails
      : null;

  return (
    <div className={styles.task}>
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
