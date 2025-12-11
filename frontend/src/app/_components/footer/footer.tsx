import Link from 'next/link';
import styles from './footer.module.css';

export function AsteraFooter() {
  return (
    <footer className={styles.footer}>
      <span className={styles.left}>
        astera © 2025
      </span>
      <span className={styles.right}>
        <Link href="/register">register</Link>
        <Link href="/login">login</Link>
      </span>
    </footer>
  )
}
