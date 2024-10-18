import SignInForm from '@/app/(auth)/signin/_component/SignInForm';
import { Metadata } from 'next';
import { pageMetadata } from '@/utils/makeMetadata';

export const metadata: Metadata = pageMetadata('로그인', '/signin');

const SignIn = () => {
  return <SignInForm />;
};

export default SignIn;
