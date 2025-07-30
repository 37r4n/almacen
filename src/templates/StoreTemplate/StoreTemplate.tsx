import { Image } from '@/ui/Image/Image';
import { Screen } from '@/ui/Screen/Screen';
import React from 'react';
import './styles.css';
import { Card } from '@/ui/Card/Card';
import { Button } from '@/ui/Button/Button';

export interface StoreTemplateOptions {
  items: {
    key: string;
    name: string;
    description: string;
    image_url: string;
  }[];

  createButton: {
    onClick: () => void;
    content: React.ReactNode;
  };
}

export const StoreTemplate = ({ items, createButton }: StoreTemplateOptions) => {
  return (
    <Screen className="template-store">
      <header>
        <Button onClick={createButton.onClick}>{createButton.content}</Button>
      </header>

      <main>
        {items.map((item) => (
          <Card key={item.key}>
            <header>
              <Image src={item.image_url ?? ''} alt="item" className="fade-bottom" />
            </header>
            <footer>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </footer>
          </Card>
        ))}
      </main>
    </Screen>
  );
};
