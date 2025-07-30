import React from 'react';
import './styles.css';

export interface CardOptions {
  children?: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardOptions) => {
  return <div className={`ui-card shadow ${className}`}>{children}</div>;
};
