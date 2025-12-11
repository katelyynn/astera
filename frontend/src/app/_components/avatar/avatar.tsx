import styles from './avatar.module.css';

interface AsteraAvatarProps {
  url?: string | undefined,
  alt?: string,
  size?: 'big' | 'med' | 'small'
}

export function AsteraAvatar({ url = undefined, alt, size = 'med' }: AsteraAvatarProps) {
  return (
    <div className={`${styles.avatar} ${styles[size]}`}>
      <img src={url} alt={alt} />
    </div>
  );
}
