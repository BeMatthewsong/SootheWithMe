'use client';

import Chip from '@/app/components/Chip/Chip';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

type filterType = 'writable' | 'written';

const ReviewFilterTab = () => {
  const filterTypeButtons = [
    { name: '작성 가능한 리뷰', type: 'writable' },
    { name: '작성한 리뷰', type: 'written' },
  ];

  const [currentFilterType, setCurrentFilterType] = useState<filterType | null>(
    null,
  );

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const path = pathname.replace('/mypage/review/', '') as filterType;
    setCurrentFilterType(path);
  }, [pathname]);

  const handleChangeFilterType = (filterType: filterType) => {
    router.push(`/mypage/review/${filterType}`);
  };

  return (
    <div className='flex items-center gap-8'>
      {filterTypeButtons.map((filterType) => (
        <button
          key={filterType.name}
          onClick={() => handleChangeFilterType(filterType.type as filterType)}
          className='transition-all duration-200 ease-in-out'
        >
          <Chip
            state={currentFilterType === filterType.type ? 'active' : 'default'}
          >
            {filterType.name}
          </Chip>
        </button>
      ))}
    </div>
  );
};

export default ReviewFilterTab;
