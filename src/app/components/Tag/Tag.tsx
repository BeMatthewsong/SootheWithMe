import { IconAlarm } from '@/public/icons';

interface TagProps {
  size?: 'large' | 'small';
  children: string;
}

const sizeClasses = {
  large: 'pr-16 rounded-tr-[22px]',
  small: 'pr-[10px]',
};

const Tag = ({ size = 'large', children }: TagProps) => {
  return (
    <div
      className={`absolute right-0 top-0 flex items-center gap-4 rounded-bl-[12px] bg-orange-600 py-4 pl-8 text-12 font-medium text-white ${sizeClasses[size]}`}
    >
      <IconAlarm width='24' height='24' />
      <span className='shrink-0'>{children}</span>
    </div>
  );
};

export default Tag;
