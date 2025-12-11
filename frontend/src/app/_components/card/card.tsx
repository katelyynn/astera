import React from 'react';
import styles from './card.module.css';

export function AsteraCard({ children }: { children: React.ReactNode }) {
  return (
    <section className={styles.card}>
      {children}
    </section>
  )
}

export function AsteraCardList({ children }: { children: React.ReactNode }) {
  return (
    <section className={styles.list}>
      {children}
    </section>
  )
}

export function AsteraContent({ children }: { children: React.ReactNode }) {
  return (
    <section className={styles.content}>
      {children}
    </section>
  )
}

export function AsteraContentWash({ children }: { children: React.ReactNode }) {
  return (
    <section className={styles.content_wash}>
      <div className={styles.inner}>{children}</div>
    </section>
  )
}

export function AsteraContentLeft({ children }: { children: React.ReactNode }) {
  return (
    <section className={styles.content_left}>
      {children}
    </section>
  )
}

export function AsteraContentRight({ children }: { children: React.ReactNode }) {
  return (
    <section className={styles.content_right}>
      {children}
    </section>
  )
}
