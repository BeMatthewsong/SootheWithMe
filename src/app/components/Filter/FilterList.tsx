import { IconCaret } from '@/public/icons';

interface FilterListProps {
  state?: 'default' | 'active';
  children: string;
}

const stateClasses = {
  default: 'border border-var-gray-100 bg-var-gray-50 text-var-gray-800',
  active: 'text-var-gray-50 bg-var-gray-900',
};

const FilterList = ({ state = 'default', children }: FilterListProps) => {
  return (
    <div
      className={`flex h-36 w-[110px] items-center justify-between rounded-[12px] py-[6px] pl-12 pr-8 text-14 font-medium md:h-40 md:w-120 md:py-8 ${stateClasses[state]}`}
    >
      {children}
      <IconCaret className='h-24 w-24' />
    </div>
  );
};

export default FilterList;
