import { Image } from '@/ui/Image/Image';
import { Screen } from '@/ui/Screen/Screen';
import React from 'react';
import './styles.css';
import { Chip } from '@/ui/Chip/Chip';

export interface OrderTemplateOptions {
  items?: {
    key: string;
    name: string;
    department: string;

    avatar: string;
    status: string;
    onClick: () => void;
  }[];
}

export const OrderTemplate = ({ items }: OrderTemplateOptions) => {
  return (
    <Screen className="template-order">
      <main>
        {items?.map((item) => (
          <div key={item.key} onClick={item.onClick} className="template-order-item shadow">
            <div className="template-order-item-left">
              <Image src={item.avatar} alt="item" className="fade-right" />
            </div>

            <div className="template-order-item-center">
              <h3>{item.name}</h3>
              <p>{item.department}</p>
            </div>

            <div className="template-order-item-right">
              <Chip>{item.status}</Chip>
            </div>
          </div>
        ))}
      </main>
    </Screen>
  );
};
