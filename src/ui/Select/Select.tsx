import React from 'react';

export interface SelectProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  options?: {
    key: string;
    value: string;
    label: string;
  }[];
}

export const Select = ({ placeholder, value, onChange, options = [] }: SelectProps) => {
  return (
    <select value={value} onChange={(e) => onChange?.(e.target.value)}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt.key} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};
