'use client';

import { IconX } from '@/public/icons';

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
}

const ModalHeader = ({ title, onClose }: ModalHeaderProps) => {
  return (
    <div className='flex items-center justify-between'>
      <h1 className='text-18 font-semibold'>{title}</h1>
      <button onClick={onClose} aria-label='close modal'>
        <IconX className='h-24 w-24 text-var-gray-900 dark:text-neutral-100' />
      </button>
    </div>
  );
};

export default ModalHeader;
