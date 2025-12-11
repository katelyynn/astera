import styles from './about.module.css';
import ReactMarkdown from 'react-markdown';

interface AsteraAboutProps {
  value: string
}

export function AsteraAbout({ value } : AsteraAboutProps) {
  return (
    <div className={styles.about}>
      <ReactMarkdown>{value}</ReactMarkdown>
    </div>
  )
}
