import React from 'react';
import './styles.css';

export interface SpinnerOptions {
  children?: React.ReactNode;
}

export const Spinner = ({ children }: SpinnerOptions) => {
  return (
    <div className="ui-spinner">
      <span className="loader"></span>
      <p>{children}</p>
    </div>
  );
};
