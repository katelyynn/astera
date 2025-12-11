import React from 'react';
import styles from './input.module.css';

interface AsteraInputProps {
  label?: string,
  placeholder?: string | undefined,
  type?: string | undefined,
  value?: string | undefined,
  on_change?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void | undefined,
  required?: boolean,
  textarea?: boolean,
  cols?: number | undefined
}

export function AsteraInput({
  label,
  placeholder,
  type,
  value,
  on_change,
  required = false,
  textarea = false,
  cols
}: AsteraInputProps) {
  if (value == null) value = undefined;

  if (textarea) {
    return (
      <div className={styles.container}>
        {label && <p className={styles.label}>{label}:</p>}
        <textarea className={styles.textarea} placeholder={placeholder} value={value} onChange={on_change} required={required} cols={cols} />
      </div>
    )
  }

  return (
    <div className={`${styles.container}`}>
      {label && <p className={styles.label}>{label}:</p>}
      <input className={styles.input} type={type} placeholder={placeholder} value={value} onChange={on_change} required={required} />
    </div>
  );
}

export function AsteraInputBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <div className={styles.label} />
      {children}
    </div>
  )
}
