import React from 'react';

export interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  isDisabled?: boolean;
}
