import ToDoLogo from '../../assets/ToDoLogo.svg'
import styles from './styles.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <img src={ToDoLogo} alt="Logotipo do ToDo" />
    </header>
  );
}