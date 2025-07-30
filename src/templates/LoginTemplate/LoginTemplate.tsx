import { Card } from '@/ui/Card/Card';
import { Image } from '@/ui/Image/Image';
import { Input } from '@/ui/Input/Input';
import { Screen } from '@/ui/Screen/Screen';
import React from 'react';
import './styles.css';
import { Button } from '@/ui/Button/Button';

export interface LogintemplateOptions {
  card: {
    icon: {
      src: string;
    };

    username: {
      value: string;
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
      label: string;
      startContent: React.ReactNode;
    };

    password: {
      value: string;
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
      label: string;
      startContent: React.ReactNode;
    };

    button: {
      content: React.ReactNode;
      onClick: () => void;
    };
  };
}

export const LoginTemplate = ({ card }: LogintemplateOptions) => {
  return (
    <Screen className="template-login">
      <Card className="template-login-card">
        <div className="template-login-icon shadow">
          <div>
            <Image src={card.icon.src} alt="icon" />
          </div>
        </div>

        <div className="template-login-content">
          <main>
            <Input type="text" {...card.username} />
            <Input type="password" {...card.password} />
          </main>

          <footer>
            <Button onClick={card.button.onClick}>{card.button.content}</Button>
          </footer>
        </div>
      </Card>
    </Screen>
  );
};
