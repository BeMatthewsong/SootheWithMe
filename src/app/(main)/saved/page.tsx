'use client';

import { useState } from 'react';
import { HeadSaved } from '@/public/images';
import Tab from '@/app/components/Tab/Tab';
import Chip from '@/app/components/Chip/Chip';
import CardList from '@/app/components/CardList/CardList';
import Filter from '@/app/components/Filter/Filter';
import FilterDate from '@/app/components/Filter/FilterDate';
import { DATA_LIST, OPTIONS, SORT_OPTIONS } from './mockData';

const SavedPage = () => {
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
    <main className='mx-auto flex h-full max-w-1200 flex-col bg-var-gray-50 px-16 pb-48 pt-24 md:px-24 md:pt-40 lg:px-100'>
      {/* head */}
      <div className='flex items-center gap-16'>
        <HeadSaved className='size-72' />
        <div>
          <h2 className='mb-8 text-18 font-semibold text-var-gray-900'>
            찜한 모임
          </h2>
          <p className='text-14 font-medium text-var-gray-700'>
            마감되기 전에 지금 바로 참여해보세요 👀
          </p>
        </div>
      </div>

      <section className='mt-24 flex grow flex-col md:mt-32'>
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

        <div className='flex flex-col gap-16'>
          {/* 버튼 칩 */}
          <div
            className={`flex items-center gap-8 ${activeTab === 'workation' && 'hidden'}`}
          >
            <button type='button' onClick={() => handleClickChips('all')}>
              <Chip state={activeChip === 'all' ? 'active' : 'default'}>
                전체
              </Chip>
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
            <button
              type='button'
              onClick={() => handleClickChips('mindfulness')}
            >
              <Chip state={activeChip === 'mindfulness' ? 'active' : 'default'}>
                마인드풀니스
              </Chip>
            </button>
          </div>

          <div className='w-full border-y border-var-gray-200' />
          {/* filter */}
          <div className='flex items-center justify-between'>
            <div className='flex gap-8'>
              <Filter type='list' state='default' options={OPTIONS}>
                지역 선택
              </Filter>
              <FilterDate state='default'>날짜 선택</FilterDate>
            </div>
            <Filter type='sort' state='default' options={SORT_OPTIONS}>
              마감 임박
            </Filter>
          </div>
        </div>
        {/* data list */}
        <div className='mt-24 flex grow flex-col gap-24'>
          {DATA_LIST.length > 0 ? (
            DATA_LIST.map((item) => <CardList key={item.id} data={item} />)
          ) : (
            <div className='flex size-full grow items-center justify-center text-14 font-medium text-var-gray-500'>
              아직 아직 찜한 모임이 없어요.
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default SavedPage;
