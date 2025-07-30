'use client';

import Cookies from 'js-cookie';
import { services } from '@/services';
import { LoginTemplate } from '@/templates/LoginTemplate/LoginTemplate';
import { Image } from '@/ui/Image/Image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const login = async () => {
    const response = await services.auth.login({ username, password });

    Cookies.set('access_token', response, { expires: 7 });
    router.push('/admin');
  };

  return (
    <LoginTemplate
      card={{
        icon: {
          src: 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png',
        },

        username: {
          startContent: (
            <Image
              src="https://www.pngall.com/wp-content/uploads/17/User-Icon-Circle-Profile-Symbol-Design-PNG.png"
              alt="user"
            />
          ),
          value: username,
          onChange: (e) => setUsername(e.target.value),
          label: 'Usuario',
        },

        password: {
          startContent: (
            <Image
              src="https://icons.veryicon.com/png/o/miscellaneous/face-monochrome-icon/password-76.png"
              alt="password"
            />
          ),
          value: password,
          onChange: (e) => setPassword(e.target.value),
          label: 'Contraseña',
        },

        button: {
          content: 'Iniciar',
          onClick: () => login(),
        },
      }}
    />
  );
}
