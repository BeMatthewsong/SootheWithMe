import { IconAlarm } from '@/public/icons';
import { ReactNode } from 'react';

interface TagProps {
  children: ReactNode;
}

const Tag = ({ children }: TagProps) => {
  return (
    <div
      className={`absolute right-0 top-0 flex items-center gap-4 rounded-bl-[12px] rounded-tr-[22px] bg-orange-600 py-4 pl-8 pr-16 text-12 font-medium text-white md:rounded-tr-none md:pr-[10px]`}
    >
      <IconAlarm width='24' height='24' />
      <span className='shrink-0'>{children}</span>
    </div>
  );
};

export default Tag;
