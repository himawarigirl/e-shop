'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import Button from '@/app/shared/components/UIKIT/Button/Button';
import { AxiosInterceptor } from '@/app/shared/core/http';
import { useLocalStorage } from '@/app/shared/hooks/useLocalStorage';
import { useUserStore } from '@/app/shared/core/providers/userProvider';
import { toast } from 'sonner';

export default function Page() {
  const [value, setValue, removeValue] = useLocalStorage('token', '');
  const { setUser } = useUserStore(state => state);
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const signupHandler = async () => {
    if (login.length > 6 && password.length > 6) {
      const data = await AxiosInterceptor.$post('/user/signup', { login, password });
      if (data.status === 200) {
        const { body } = data;
        setValue(body.token);
        setUser(1, body.user.login);
        router.push('/');
      } else {
        toast.error(data.message);
        // console.log('Error:', data);
      }
    }
  };

  return (
    <div>
      <Input onChange={e => setLogin(e.currentTarget.value)} value={login} placeholder="Логин" />
      <Input onChange={e => setPassword(e.currentTarget.value)} value={password} placeholder="Пароль" />

      <Button size="m" onClick={async () => await signupHandler()} style="black_outline">
        Регистрация
      </Button>
    </div>
  );
}
