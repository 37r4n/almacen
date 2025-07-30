import React from 'react';
import './styles.css';

export interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const Image = ({ src, alt, className }: ImageProps) => {
  return <img src={src} alt={alt} className={`ui-image ${className}`} />;
};
