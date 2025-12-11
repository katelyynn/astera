import { Tooltip } from 'radix-ui';
import styles from './tooltip.module.css';
import React from 'react';

interface AsteraTooltipProps {
  content: React.ReactNode,
  children: React.ReactNode
}

export function AsteraTooltip({ content, children }: AsteraTooltipProps) {
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          {children}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className={styles.tooltip}>
            {content}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
