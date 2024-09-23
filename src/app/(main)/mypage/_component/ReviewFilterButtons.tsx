'use client';

import Chip from '@/app/components/Chip/Chip';
import { useState } from 'react';

interface ReviewFilterButtonsProps {
  filterType: string;
  setFilterType: (type: string) => void;
}

const ReviewFilterButtons = ({
  filterType,
  setFilterType,
}: ReviewFilterButtonsProps) => {
  const filterTypeList = ['작성 가능한 리뷰', '작성한 리뷰'] as const;

  const handleChangeFilterType = (type: (typeof filterTypeList)[number]) => {
    setFilterType(filterType === type ? '' : type);
  };

  return (
    <div className='flex items-center gap-8'>
      {filterTypeList.map((type) => (
        <button
          key={type}
          onClick={() => handleChangeFilterType(type)}
          className='transition-all duration-200 ease-in-out'
          aria-pressed={filterType === type}
        >
          <Chip state={filterType === type ? 'active' : 'default'}>{type}</Chip>
        </button>
      ))}
    </div>
  );
};

export default ReviewFilterButtons;
