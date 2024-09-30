import Filter from '@/app/components/Filter/Filter';
import FilterDate from '@/app/components/Filter/FilterDate';
import { LOCATION_OPTIONS, REVIEW_SORT_OPTIONS } from '@/constants/common';

interface FiltersProps {
  onLocationChange: (location: string | undefined) => void;
  onDateChange: (date: Date | null) => void;
  onSortChange: (sortOption: string | undefined) => void;
}

const Filters = ({
  onLocationChange,
  onDateChange,
  onSortChange,
}: FiltersProps) => {
  const handleLocationSelect = (selectedOption: string | undefined) => {
    onLocationChange(selectedOption);
  };

  const handleSortSelect = (sortOption: string | undefined) => {
    onSortChange(sortOption);
  };

  return (
    <div className='flex justify-between pt-16'>
      <div className='flex space-x-8'>
        <Filter
          type='list'
          state='default'
          options={LOCATION_OPTIONS}
          onSelect={handleLocationSelect}
        >
          지역 전체
        </Filter>
        <FilterDate state='default' onSelectDate={onDateChange}>
          날짜 전체
        </FilterDate>
      </div>
      <div>
        <Filter
          type='sort'
          state='default'
          options={REVIEW_SORT_OPTIONS}
          onSelect={handleSortSelect}
        >
          정렬
        </Filter>
      </div>
    </div>
  );
};

export default Filters;
