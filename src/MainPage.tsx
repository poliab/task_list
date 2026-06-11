import { Footer } from './ui/Footer';
import { Header } from './ui/Header';
import { PageTitle } from './ui/PageTitle';
import { TaskDetails } from './ui/TaskDetails';
import { TasksList } from './ui/TasksList';
import { useTaskSelection } from './bll/useTaskSelection';
import styles from './MainPage.module.css'

export function MainPage() {
  const {selectedTaskId, setSelectedTaskId, boardId, setBoardId} = useTaskSelection()
  
  const handleTaskSelect = (taskId: string | null): void => {
    setSelectedTaskId(taskId)
    setBoardId(taskId)
  }

  return (
    <div>
      <Header />
      <PageTitle />
      <div className={styles.container}>
        <TasksList
          selectedTaskId={selectedTaskId}
          onTaskSelected={handleTaskSelect}
        />
        <TaskDetails selectedTaskId={selectedTaskId} boardId={boardId} />
      </div>
      <Footer />
    </div>
  );
}
