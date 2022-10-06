import styles from './styles.module.css';
import { Trash, CheckCircle, Circle } from 'phosphor-react';

interface ITaskProps {
  id: number;
  completed: boolean;
  title: string;
  onDelete: (id: number) => void;
  onCheck: (id: number) => void;
}

export function Task({ id, title, completed, onDelete, onCheck }: ITaskProps) {
  function handleDeleteTask() {
    onDelete(id);
  }

  function handleCheckTask() {
    onCheck(id);
  }
  const taskClassName = `${styles.task} ${completed ? styles.checked : styles.toCheck}`;
  
  return (
    <div className={taskClassName}>
      <div>
        <button onClick={handleCheckTask}>
          {completed ? <CheckCircle size={24} weight="fill"/> : <Circle size={24} />}
        </button>
        <p>{title}</p>
      </div>
      <button onClick={handleDeleteTask} className={styles.deleteButton}><Trash size={24} /></button>
    </div>
  );
}