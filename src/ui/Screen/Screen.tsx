import React from 'react';
import './styles.css';

export interface ScreenOptions {
  children?: React.ReactNode;
  className?: string;
}

export const Screen = ({ children, className }: ScreenOptions) => {
  return <div className={`ui-screen ${className}`}>{children}</div>;
};
