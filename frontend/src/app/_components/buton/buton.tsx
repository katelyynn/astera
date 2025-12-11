"use client";

import React from 'react';
import styles from './buton.module.css';

interface AsteraButtonProps {
  type?: "button" | "submit" | "reset" | undefined,
  children: React.ReactNode
}

export function AsteraButon({
  type = 'button',
  children
}: AsteraButtonProps) {
  return (
    <button className={`${styles.buton}`} type={type}>
      {children}
    </button>
  )
}
