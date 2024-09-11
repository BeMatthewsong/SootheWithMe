import SignUpForm from '@/app/components/AuthForm/SignUpForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입 | Soothe With Me',
  description: 'Soothe With Me 회원가입 페이지입니다.',
};

const SignUp = () => {
  return <SignUpForm />;
};

export default SignUp;
