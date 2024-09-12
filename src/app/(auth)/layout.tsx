import { ImageLogin } from '@/public/images';
import Footer from './_component/Footer';
import { ReactNode } from 'react';

const Layout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <div className='min-h-dvh w-full bg-var-gray-100'>
      <div className='flex flex-col items-center justify-between gap-32 py-40 md:mx-24 lg:mx-auto lg:max-w-[1200px] lg:flex-row lg:gap-100 lg:px-24 lg:pt-40'>
        {/* 이미지 영역 */}
        <div className='text-center'>
          <h1 className='text-20 font-semibold md:text-24'>
            Welcome to 같이 달램!
          </h1>
          <p className='text-14 font-medium md:text-16'>
            바쁜 일상 속 잠깐의 휴식, <br />
            이제는 같이 달램과 함께 해보세요
          </p>
          <ImageLogin className='w-[290px] md:w-[407px] lg:w-[588px]' />
        </div>

        {/* form 영역 */}
        <div className='w-[343px] rounded-[24px] bg-var-white px-16 py-32 md:w-[510px] md:px-[54px]'>
          {children}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
