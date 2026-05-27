import { useState } from 'react';
import { Footer } from './ui/Footer';
import { Header } from './ui/Header';
import { PageTitle } from './ui/PageTitle';
import { TaskDetails } from './ui/TaskDetails';
import { TasksList } from './ui/TasksList';

export function MainPage() {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  const [boardId, setBoardId] = useState<string | null>(null)

  const handleTaskSelect = (taskId: string | null): void => {
    setSelectedTaskId(taskId)
    setBoardId(taskId)
  }

  return (
    <div>
      <Header />
      <PageTitle />
      <div style={{ display: "flex", gap: "30px" }}>
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
