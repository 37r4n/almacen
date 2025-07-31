import React from 'react';
import './styles.css';

export interface ChipOptions {
  children?: React.ReactNode;
  className?: string;
}

export const Chip = ({ children, className }: ChipOptions) => {
  return <div className={`ui-chip shadow ${className}`}>{children}</div>;
};
