import { Screen } from '@/ui/Screen/Screen';
import React from 'react';
import './styles.css';
import { Image } from '@/ui/Image/Image';
import { Select } from '@/ui/Select/Select';
import { Button } from '@/ui/Button/Button';
import { Navbar } from '@/components/Navbar/Navbar';
import { Spinner } from '@/ui/Spinner/Spinner';

export interface CartTemplateProps {
  navbar: {
    user: {
      name: string;
      image_url: string;
    };
  };

  spinner: {
    isLoading: boolean;
    text: string;
  };

  items: {
    key: string;
    title: string;
    description: string | null;
    image_url: string | null;
    quantity: number;
    select: {
      value: string;
      placeholder?: string;
      options: {
        key: string;
        id: string;
        name: string;
      }[];
      onChange?: (value: string) => void;
    };
  }[];

  button: {
    content: React.ReactNode;
    onClick: () => void;
  };

  fallback: {
    content: React.ReactNode;
  };
}

export const CartTemplate = ({ navbar, items = [], button, spinner, fallback }: CartTemplateProps) => {
  return (
    <Screen className="template-cart">
      <Navbar {...navbar} />

      {spinner.isLoading && (
        <main>
          <Spinner>{spinner.text}</Spinner>
        </main>
      )}

      {!spinner.isLoading && items.length <= 0 && <main>{fallback.content}</main>}

      {!spinner.isLoading && items.length > 0 && (
        <>
          <main>
            {items.map((item) => (
              <div key={item.key} className="template-cart-item shadow">
                <div className="template-cart-item-image fade-right">
                  <Image src={item.image_url ?? ''} alt={item.key} />
                </div>

                <div className="template-cart-item-data">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <div className="template-cart-item-info">
                  <p>({item.quantity})</p>
                </div>

                <div className="template-cart-item-actions">
                  <Select
                    value={item.select.value}
                    placeholder={item.select.placeholder}
                    options={item.select.options.map((option) => ({
                      key: option.id,
                      value: option.id,
                      label: option.name,
                    }))}
                    onChange={item.select.onChange}
                  />
                </div>
              </div>
            ))}
          </main>

          <footer>
            <Button onClick={button.onClick}>{button.content}</Button>
          </footer>
        </>
      )}
    </Screen>
  );
};
