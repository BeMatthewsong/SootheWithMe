'use client';

import { IconX } from '@/public/icons';

interface HeaderProps {
  onClose: () => void;
}

const Header = ({ onClose }: HeaderProps) => {
  return (
    <div className='flex items-center justify-between'>
      <h1 className='text-18 font-semibold text-var-gray-900'>모임 만들기</h1>
      <button onClick={onClose}>
        <IconX className='h-24 w-24' />
      </button>
    </div>
  );
};

export default Header;
