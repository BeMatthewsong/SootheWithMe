import { Metadata } from 'next';
import { ReactNode } from 'react';
import { pageMetadata } from '@/utils/makeMetadata';

export const metadata: Metadata = pageMetadata('찜한 모임', '/saved');

const Layout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return <>{children}</>;
};

export default Layout;
