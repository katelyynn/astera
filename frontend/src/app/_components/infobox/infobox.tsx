import React from 'react';
import styles from './infobox.module.css';

interface AsteraInfoBoxProps {
  label: string,
  children: React.ReactNode
}

export function AsteraInfoBox({ label, children }: AsteraInfoBoxProps) {
  return (
    <div className={styles.infobox}>
      <label className={styles.label}>{label}</label>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}

export function AsteraInfoBoxList({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.list}>
      {children}
    </div>
  );
}

interface AsteraSummaryProps {
  label: string,
  children: React.ReactNode
}

export function AsteraSummary({ label, children }: AsteraSummaryProps) {
  return (
    <dl className={styles.summary}>
      <dt>{label}:</dt>
      <dd>{children}</dd>
    </dl>
  );
}

export function AsteraSummaryList({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.summary_list}>
      {children}
    </div>
  );
}
