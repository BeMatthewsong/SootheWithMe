'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Button from '../../../components/Button/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '../../_component/FormOptions';
import FormField from '../../_component/FormField';
import { SignUpData } from '@/types/client.type';
import { submitSignUpData } from '@/app/api/auths/service/postSignUp';
import Popup from '@/app/components/Popup/Popup';
import { useState } from 'react';

const SignUpForm = () => {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm<SignUpData>({
    mode: 'onSubmit',
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      companyName: '',
      password: '',
      passwordCheck: '',
    },
  });

  const submit = async (data: SignUpData) => {
    try {
      await submitSignUpData(data);
      setIsPopupOpen(true);
    } catch (error) {
      if (error instanceof Error) {
        // 이메일 관련 오류 처리
        if (error.message.includes('이미 사용 중인 이메일입니다')) {
          setError('email', {
            type: 'manual',
            message: '이미 사용 중인 이메일입니다.',
          });
        } else {
          console.error('Error:', error.message);
        }
      }
    }
  };

  /* 팝업 닫기 */
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  /* 팝업 닫기 */
  const handleClickConfirm = () => {
    router.push('/signin');
  };

  return (
    <div className='relative'>
      <form
        className='rounded-[24px] bg-transparent'
        onSubmit={handleSubmit(submit)}
      >
        <div className='flex w-full flex-col gap-24'>
          <h1 className='pb-8 text-center text-24 font-semibold'>회원가입</h1>
          <FormField
            label='이름'
            name='name'
            placeholder='이름을 입력해주세요.'
            register={register}
            error={errors.name?.message}
          />
          <FormField
            label='아이디'
            name='email'
            placeholder='이메일을 입력해주세요.'
            register={register}
            error={errors.email?.message}
          />
          <FormField
            label='회사명'
            name='companyName'
            placeholder='회사명을 입력해주세요.'
            register={register}
            error={errors.companyName?.message}
          />
          <FormField
            label='비밀번호'
            name='password'
            placeholder='비밀번호를 입력해주세요.'
            register={register}
            error={errors.password?.message}
            type='password'
          />
          {!errors.password && (
            <div className='-mt-12 text-12 text-gray-700 dark:text-neutral-300'>
              ※ 비밀번호는 영문과 숫자가 포함된 8자 이상이 되도록 해 주세요.
            </div>
          )}
          <FormField
            label='비밀번호 확인'
            name='passwordCheck'
            placeholder='비밀번호를 다시 한 번 입력해주세요.'
            register={register}
            error={errors.passwordCheck?.message}
            type='password'
          />
          <Button
            type='submit'
            name='확인'
            variant={isValid ? 'default' : 'gray'}
            disabled={!isValid}
          />
        </div>
      </form>
      {isPopupOpen && (
        <div className='fixed inset-0 z-popup flex items-center justify-center bg-black bg-opacity-50'>
          <Popup
            type='signUpCompleted'
            hasCancelButton={false}
            onClickClose={handleClosePopup}
            onClickConfirm={handleClickConfirm}
          />
        </div>
      )}
    </div>
  );
};

export default SignUpForm;
