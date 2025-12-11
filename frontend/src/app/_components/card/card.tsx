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
