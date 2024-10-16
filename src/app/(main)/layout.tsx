import { ReactNode } from 'react';
import ScrollTopButton from '../components/ScrollTopButton/ScrollTopButton';

const Layout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <>
      {children}
      <ScrollTopButton />
    </>
  );
};

export default Layout;
