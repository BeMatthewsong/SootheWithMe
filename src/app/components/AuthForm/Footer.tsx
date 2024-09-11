'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();
  const isSignIn = pathname === '/signin';
  const spanText = isSignIn
    ? '같이 달램이 처음 이신가요? '
    : '이미 회원이신가요? ';
  const linkText = isSignIn ? '회원가입' : '로그인';
  const linkSrc = isSignIn ? 'signup' : 'signin';

  return (
    <div className='flex items-center justify-center gap-4 pt-24 text-[15px] font-medium'>
      <span className='flex items-center justify-center text-[15px] font-medium'>
        {spanText}
      </span>
      <Link className='text-var-orange-600 underline' href={linkSrc}>
        {linkText}
      </Link>
    </div>
  );
};
export default Footer;
