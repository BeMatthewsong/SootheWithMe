'use client';

import { IconX } from '@/public/icons';

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
}

const ModalHeader = ({ title, onClose }: ModalHeaderProps) => {
  return (
    <div className='flex items-center justify-between'>
      <h1 className='text-18 font-semibold text-var-gray-900'>{title}</h1>
      <button onClick={onClose}>
        <IconX className='h-24 w-24' />
      </button>
    </div>
  );
};

export default ModalHeader;
