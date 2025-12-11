import styles from './time.module.css';
import { DateTime } from 'luxon';

interface AsteraTimeProps {
  time: string
}

export function AsteraTime({ time }: AsteraTimeProps) {
  const date = DateTime.fromISO(time).setZone(Intl.DateTimeFormat().resolvedOptions().timeZone);

  return (
    <span className={styles.time}>{date.toLocaleString(DateTime.DATE_HUGE)}</span>
  )
}
