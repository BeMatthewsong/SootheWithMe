import SignInForm from '@/app/(auth)/signin/_component/SignInForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로그인 | Soothe With Me',
  description: 'Soothe With Me 로그인 페이지입니다.',
};

const SignIn = () => {
  return <SignInForm />;
};

export default SignIn;
