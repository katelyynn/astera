import remarkGfm from 'remark-gfm';
import styles from './about.module.css';
import ReactMarkdown from 'react-markdown';

interface AsteraAboutProps {
  value: string
}

export function AsteraAbout({ value } : AsteraAboutProps) {
  return (
    <div className={`${styles.about} md`}>
      <ReactMarkdown rehypePlugins={[remarkGfm]}>{value}</ReactMarkdown>
    </div>
  )
}
