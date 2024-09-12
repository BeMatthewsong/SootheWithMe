'use client';

import { useForm } from 'react-hook-form';
import Button from '../../../components/Button/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '../../_component/FormOptions';
import FormField from '../../_component/FormField';
import { SignUpData } from '@/types/client.type';

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpData>({
    mode: 'onBlur',
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      password: '',
      passwordCheck: '',
    },
  });

  //@todo 제출 함수 작성
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
          name='company'
          placeholder='회사명을 입력해주세요.'
          register={register}
          error={errors.company?.message}
        />
        <FormField
          label='비밀번호'
          name='password'
          placeholder='비밀번호를 입력해주세요.'
          register={register}
          error={errors.password?.message}
          type='password'
        />
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
  );
};

export default SignUpForm;
