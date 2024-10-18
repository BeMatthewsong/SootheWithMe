import '@/styles/globals.css';
import '@/styles/reset.css';
import '@/styles/style.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import Gnb from './components/Gnb/Gnb';
import Providers from './providers';
import { getUserData } from './api/actions/mypage/getUserData';
import { toastOptions } from '@/constants/toast.config';

import { Toaster } from 'react-hot-toast';
import { getCookie } from './api/actions/cookie/cookie';

import { rootMetadata } from '@/utils/makeMetadata';

export const metadata: Metadata = rootMetadata;

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const user = await getUserData();
  const token = await getCookie('token');
  return (
    <html lang='ko'>
      <body className='flex min-h-dvh flex-col bg-var-gray-100 font-pretendard text-var-gray-900 dark:bg-neutral-950 dark:text-neutral-50'>
        <Providers>
          <Gnb user={user} token={token} />
          <div className='grow pt-60'>{children}</div>
          <div id='modal-root'></div>
          <Toaster toastOptions={toastOptions} />
        </Providers>
      </body>
    </html>
  );
}
