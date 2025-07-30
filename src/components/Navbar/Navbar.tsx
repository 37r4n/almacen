import React from 'react';
import './styles.css';
import { Image } from '@/ui/Image/Image';

export interface NavbarProps {
  user: {
    name: string;
    image_url: string;
  };

  children?: React.ReactNode;
}

export const Navbar = ({ user, children }: NavbarProps) => {
  return (
    <div className="component-navbar shadow">
      <div className="component-navbar-left">
        <Image src={user.image_url} alt="" />
        <p>{user.name}</p>
      </div>

      <div className="component-navbar-center">{children}</div>

      <div className="component-navbar-right"></div>
    </div>
  );
};
