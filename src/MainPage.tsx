import { useState } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { PageTitle } from './components/PageTitle';
import { TaskDetails } from './components/TaskDetails';
import { TasksList } from './components/TasksList';

export function MainPage() {
  const [selectedTaskId, setSelectedTaskId] = useState(null)
  const [boardId, setBoardId] = useState(null)

  return (
    <div>
      <Header />
      <PageTitle />
      <div style={{ display: "flex", gap: "30px" }}>
        <TasksList
          selectedTaskId={selectedTaskId}
          onTaskSelected={(taskId) => {
          setSelectedTaskId(taskId)
          setBoardId(taskId)
        }}
        />
        <TaskDetails selectedTaskId={selectedTaskId} boardId={boardId} />
      </div>
      <Footer />
    </div>
  );
}
