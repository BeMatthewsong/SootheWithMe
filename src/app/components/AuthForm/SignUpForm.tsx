'use client';

import { Controller, useForm } from 'react-hook-form';
import Button from '../Button/Button';
import Input from '../Input/Input';
import FORM_OPTIONS from './FormOptions';

interface SignUpData {
  name: string;
  email: string;
  company: string;
  password: string;
  passwordCheck: string;
}

const SignUpForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      company: '',
      password: '',
      passwordCheck: '',
    },
  });

  const submit = (data: SignUpData) => {
    console.log(data);
  };
  return (
    <form
      className='rounded-[24px] bg-var-white'
      onSubmit={handleSubmit(submit)}
    >
      <div className='flex w-full flex-col gap-24'>
        <h1 className='pb-8 text-center text-24 font-semibold'>회원가입</h1>
        <div className='flex flex-col gap-4'>
          <label className='text-14 font-semibold'>이름</label>
          <Controller
            control={control}
            name={FORM_OPTIONS.nameCheck.name}
            rules={FORM_OPTIONS.nameCheck.rules}
            render={({ field }) => (
              <Input
                placeholder='이름을 입려해주세요.'
                className='h-44'
                hasError={!!errors.name}
                {...field}
              />
            )}
          />
          {errors.name && (
            <div className={FORM_OPTIONS.errorMessageStyle}>
              {errors.name.message}
            </div>
          )}
        </div>
        <div className='flex flex-col gap-4'>
          <label className='text-14 font-semibold'>아이디</label>
          <Controller
            control={control}
            name={FORM_OPTIONS.email.name}
            rules={FORM_OPTIONS.email.rules}
            render={({ field }) => (
              <Input
                placeholder='이메일을 입려해주세요.'
                className='h-44'
                hasError={!!errors.email}
                {...field}
              />
            )}
          />
          {errors.email && (
            <div className={FORM_OPTIONS.errorMessageStyle}>
              {errors.email.message}
            </div>
          )}
        </div>
        <div className='flex flex-col gap-4'>
          <label className='text-14 font-semibold'>회사명</label>
          <Controller
            control={control}
            name={FORM_OPTIONS.companyName.name}
            rules={FORM_OPTIONS.companyName.rules}
            render={({ field }) => (
              <Input
                placeholder='회사명을 입려해주세요.'
                className='h-44'
                hasError={!!errors.company}
                {...field}
              />
            )}
          />
          {errors.company && (
            <div className={FORM_OPTIONS.errorMessageStyle}>
              {errors.company.message}
            </div>
          )}
        </div>
        <div className='flex flex-col gap-4'>
          <label className='text-14 font-semibold'>비밀번호</label>
          <Controller
            control={control}
            name={FORM_OPTIONS.password.name}
            rules={FORM_OPTIONS.password.rules}
            render={({ field }) => (
              <Input
                placeholder='비밀번호를 입력해주세요.'
                className='mb-16 h-44'
                hasError={!!errors.password}
                {...field}
              />
            )}
          />
          {errors.password && (
            <div className={FORM_OPTIONS.errorMessageStyle}>
              {errors.password.message}
            </div>
          )}
        </div>
        <div className='flex flex-col gap-4'>
          <label className='text-14 font-semibold'>비밀번호 확인</label>
          <Controller
            control={control}
            name={FORM_OPTIONS.passwordCheck.name}
            rules={FORM_OPTIONS.passwordCheck.rules}
            render={({ field }) => (
              <Input
                placeholder='비밀번호를 다시 한 번 입력해주세요.'
                className='h-44'
                hasError={!!errors.passwordCheck}
                {...field}
              />
            )}
          />
          {errors.passwordCheck && (
            <div className={FORM_OPTIONS.errorMessageStyle}>
              {errors.passwordCheck.message}
            </div>
          )}
        </div>
        <Button
          type='submit'
          name='확인'
          variant={isValid ? 'default' : 'gray'}
          disabled={!isValid}
        />
      </div>
    </form>
  );
};

export default SignUpForm;
