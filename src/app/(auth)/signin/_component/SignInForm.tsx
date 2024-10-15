'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Button from '../../../components/Button/Button';
import { signinSchema } from '../../_component/FormOptions';
import { zodResolver } from '@hookform/resolvers/zod';
import FormField from '../../_component/FormField';
import { SignInData } from '@/types/client.type';
import { submitSignInData } from '@/app/api/auths/service/postSignIn';
import { clientRevalidate } from '@/lib/clientRevalidate';

const SignInForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm<SignInData>({
    mode: 'onSubmit',
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const submit = async (data: SignInData) => {
    try {
      const result = await submitSignInData(data);

      clientRevalidate('/');
      router.push('/gatherings');
    } catch (error) {
      if (error instanceof Error) {
        switch (true) {
          case error.message.includes('잘못된 이메일 또는 비밀번호입니다'):
            setError('email', {
              type: 'manual',
              message: '잘못된 이메일 또는 비밀번호입니다',
            });
            setError('password', {
              type: 'manual',
              message: '잘못된 이메일 또는 비밀번호입니다',
            });
            break;
          case error.message.includes('유효한 이메일 주소를 입력하세요'):
            setError('email', {
              type: 'manual',
              message: '유효한 이메일 주소를 입력하세요',
            });
            break;
          default:
            console.error('Error:', error.message);
            break;
        }
      }
    }
  };

  return (
    <form
      className='rounded-[24px] bg-transparent'
      onSubmit={handleSubmit(submit)}
    >
      <div className='flex flex-col gap-24'>
        <h1 className='pb-8 text-center text-24 font-semibold'>로그인</h1>
        <FormField
          label='아이디'
          name='email'
          placeholder='이메일을 입력해주세요.'
          register={register}
          error={errors.email?.message}
        />
        <FormField
          label='비밀번호'
          name='password'
          placeholder='비밀번호를 입력해주세요.'
          register={register}
          error={errors.password?.message}
          type='password'
        />
        <Button
          type='submit'
          name='로그인'
          variant={isValid ? 'default' : 'gray'}
          disabled={!isValid}
        />
      </div>
    </form>
  );
};

export default SignInForm;
