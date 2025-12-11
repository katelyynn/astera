import Link from 'next/link';
import styles from './header.module.css';

export function AsteraHeader({ me }: { me: {
  username: string
} | null }) {
  if (!me) {
    return (
      <header className={styles.header}>
        not logged in
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        astera
      </Link>
      <span className={styles.right}>
        <Link className={styles.item} href={`/user/${me.username}`}>
          {me.username}
        </Link>
        <span className={styles.sep}>•</span>
        <Link className={styles.item} href="/settings">
          settings
        </Link>
        <span className={styles.sep}>•</span>
        <Link className={styles.item} href="/logout">
          log out
        </Link>
      </span>
    </header>
  );
}
