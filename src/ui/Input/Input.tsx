import React from 'react';
import './styles.css';

export interface InputOptions {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  startContent: React.ReactNode;
  type: string;
}

export const Input = ({ label, value, onChange, startContent, type }: InputOptions) => {
  return (
    <div className="ui-input">
      <div className="ui-input-start-content">{startContent}</div>

      <div className="ui-input-center-content">
        <input type={type} placeholder={label} value={value} onChange={onChange} />
      </div>
    </div>
  );
};
