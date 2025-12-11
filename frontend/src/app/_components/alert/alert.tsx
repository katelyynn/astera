import styles from './alert.module.css';

interface AsteraAlertProps {
  label: string,
  type?: string
}

export function AsteraAlert({
  label,
  type = 'info'
}: AsteraAlertProps) {
  return (
    <div className={`${styles.alert} ${styles[type]}`}>
      {label}
    </div>
  )
}
