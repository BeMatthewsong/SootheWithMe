import SignUpForm from '@/app/(auth)/signup/_component/SignUpForm';
import { Metadata } from 'next';
import { pageMetadata } from '@/utils/makeMetadata';

export const metadata: Metadata = pageMetadata('회원가입', '/signup');

const SignUp = () => {
  return <SignUpForm />;
};

export default SignUp;
