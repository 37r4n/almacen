'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { services } from '@/services';
import { Navbar } from '@/components/Navbar/Navbar';
import { Employee } from '@/models/Employee';
import { Button } from '@/ui/Button/Button';
import { useRouter } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const router = useRouter();

  const validate = async () => {
    try {
      const access_token = Cookies.get('access_token') ?? '';
      const response = await services.auth.validate({ access_token });
      setEmployee(response);
      if (response.id == 'undefined') {
        router.push('/login');
      }
    } catch {
      console.log(123);
      router.push('/login');
    }
  };

  useEffect(() => {
    validate();
  }, []);

  return (
    <html lang="es">
      <body>
        <Navbar
          user={{
            name: employee?.name || '',
            image_url: employee?.image_url ?? 'https://static.thenounproject.com/png/5100711-200.png',
          }}
        >
          <Button onClick={() => router.push('/admin')}>
            <p>Productos</p>
          </Button>

          <Button onClick={() => router.push('/admin/ordenes')}>
            <p>Órdenes</p>
          </Button>
        </Navbar>

        {children}
      </body>
    </html>
  );
}
