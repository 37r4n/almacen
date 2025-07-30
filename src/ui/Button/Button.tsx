import React from 'react';
import './styles.css';
import { ButtonProps } from './types';

export const Button = ({ className, children, onClick, isDisabled }: ButtonProps) => {
  return (
    <button onClick={onClick} disabled={isDisabled} className={`ui-button shadow ${className}`}>
      {children}
    </button>
  );
};
