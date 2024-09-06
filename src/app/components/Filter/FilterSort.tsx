import { IconSort } from '@/public/icons';

interface FilterSortProps {
  state?: 'default' | 'active';
  children: string;
}

const stateClasses = {
  default: 'border border-var-gray-100 bg-var-gray-50 text-var-gray-800',
  active: 'text-var-gray-50 bg-var-gray-900',
};

const FilterSort = ({ state = 'default', children }: FilterSortProps) => {
  return (
    <div
      className={`flex h-36 w-36 items-center justify-between rounded-[12px] p-[6px] text-14 font-medium md:h-40 md:w-120 md:px-12 md:py-[6px] ${stateClasses[state]}`}
    >
      <IconSort className='h-24 w-24' />
      <span className='hidden md:mr-8 md:inline'>{children}</span>
    </div>
  );
};

export default FilterSort;
