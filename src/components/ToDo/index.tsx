import styles from './styles.module.css';
import { PlusCircle } from 'phosphor-react';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { Task } from '../Task';
import ClipboardIcon from '../../assets/clipboard.svg';

interface ITasks {
  id: number;
  title: string;
  completed: boolean;
}

export function ToDo() {
  const [tasks, setTasks] = useState<ITasks[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateTask(event: FormEvent) {
    event.preventDefault();
    if(!newTaskTitle.trim()) {
      return;
    }

    const newTask = {
      id: Number((Math.random() * 1e9).toFixed(0)),
      title: newTaskTitle,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  }

  function handleNewTaskTitleChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskTitle(event.target.value);
    event.target.setCustomValidity('');
  }

  function deleteTask(id: number) {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
  }

  function checkTask(id: number) {
    const tasksCopy = [...tasks];
    const task = tasksCopy.find(task => task.id === id);
    if (task) {
      task.completed = !task.completed;
    }
    setTasks(tasksCopy);
  }

  function handleInvalidInput(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('A tarefa não pode ser vazia');
  }

  const createdTasksCount = tasks.length;
  const completedTasksCount = tasks.reduce((acc, task) => acc + Number(task.completed), 0);
  const formattedCompletedTasks = 
    createdTasksCount !== 0 
    ? `${completedTasksCount} de ${createdTasksCount}` 
    : '0'

  return (
    <section className={styles.todo}>
      <form onSubmit={handleCreateTask}>
        <input
          onChange={handleNewTaskTitleChange}
          value={newTaskTitle}
          type="text"
          placeholder='Adicione uma nova tarefa'
          required
          onInvalid={handleInvalidInput}
        />
        <button type="submit">Criar <PlusCircle /></button>
      </form>

      <main className={styles.taskList}>
        <header>
          <div>
            <strong className={styles.createdTasks}>Tarefas criadas</strong> <span>{createdTasksCount}</span>
          </div>
          <div>
            <strong className={styles.completedTasks}>Concluídas</strong> <span>{formattedCompletedTasks}</span>
          </div>
        </header>

        {tasks.length === 0 
        ? <section className={styles.emptyTasksList}>
            <img src={ClipboardIcon} />
            <p><strong>Você ainda não tem tarefas cadastradas</strong></p>
            <span>Crie tarefas e organize seus itens a fazer</span>
          </section>
        : tasks.map(({id, title, completed}) => (
          <Task 
            key={id}
            id={id}
            title={title}
            completed={completed}
            onCheck={checkTask}
            onDelete={deleteTask}
          />
        ))}

      </main>
    </section>
  );
}