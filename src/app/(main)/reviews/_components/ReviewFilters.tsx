'use client';

import Chip from '@/app/components/Chip/Chip';
import Tab from '@/app/components/Tab/Tab';
import { useState } from 'react';

const ReviewFilters = () => {
  const [activeTab, setActiveTab] = useState<'dalaemfit' | 'workation'>(
    'dalaemfit',
  );

  const [activeChip, setActiveChip] = useState<
    'all' | 'officeStretching' | 'mindfulness'
  >('all');

  const handleClickTab = (type: 'dalaemfit' | 'workation') => {
    setActiveTab(type);
    if (type === 'workation') {
      setActiveChip('all');
    }
  };

  const handleClickChips = (
    type: 'all' | 'officeStretching' | 'mindfulness',
  ) => {
    setActiveChip(type);
  };

  return (
    <>
      {/* tab */}
      <div className='mb-12 flex items-center'>
        <Tab
          type='dalaemfit'
          isActive={activeTab === 'dalaemfit'}
          onClick={() => handleClickTab('dalaemfit')}
        />
        <Tab
          type='workation'
          isActive={activeTab === 'workation'}
          onClick={() => handleClickTab('workation')}
        />
      </div>

      <div
        className={`mb-16 flex items-center gap-8 ${activeTab === 'workation' ? 'hidden' : ''}`}
      >
        <button type='button' onClick={() => handleClickChips('all')}>
          <Chip state={activeChip === 'all' ? 'active' : 'default'}>전체</Chip>
        </button>
        <button
          type='button'
          onClick={() => handleClickChips('officeStretching')}
        >
          <Chip
            state={activeChip === 'officeStretching' ? 'active' : 'default'}
          >
            오피스 스트레칭
          </Chip>
        </button>
        <button type='button' onClick={() => handleClickChips('mindfulness')}>
          <Chip state={activeChip === 'mindfulness' ? 'active' : 'default'}>
            마인드풀니스
          </Chip>
        </button>
      </div>
    </>
  );
};

export default ReviewFilters;
