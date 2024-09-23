import UserProfileLayout from '@/app/components/UserProfileLayout/UserProfileLayout';
import { ReactNode } from 'react';
import Tab from './_component/Tab';

const Layout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <main className='mx-auto flex h-full max-w-1200 flex-col bg-var-gray-50 px-16 pt-24 md:px-24 md:pt-32 lg:px-100'>
      {/* head */}
      <div className='mb-16 flex flex-col gap-16 md:mb-28 md:gap-24'>
        <h2 className='text-24 font-semibold text-var-gray-900'>마이페이지</h2>
        <UserProfileLayout />
      </div>
      <section className='flex w-full grow flex-col border-t-2 border-var-gray-900 bg-white px-16 py-24 md:px-24'>
        <Tab />
        {children}
      </section>
    </main>
  );
};

export default Layout;
