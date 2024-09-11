'use client';

import { useState } from 'react';

import { HeadClass } from '@/public/images';
import Tab from '@/app/components/Tab/Tab';
import Button from '@/app/components/Button/Button';
import Chip from '@/app/components/Chip/Chip';
import FilterList from '@/app/components/Filter/FilterList';
import FilterSort from '@/app/components/Filter/FilterSort';
import CardList from '@/app/components/CardList/CardList';

import { mockData, OPTIONS, SORT_OPTIONS } from './mockData/mockData';

const GatheringsPage = () => {
  const [activeTab, setActiveTab] = useState<'workation' | 'dalaemfit'>(
    'dalaemfit',
  );

  const handleTabClick = (type: 'workation' | 'dalaemfit') => {
    setActiveTab(type);
  };

  return (
    <div className='mx-auto max-w-[1200px]'>
      <div className='min-h-screen bg-var-gray-50 px-16 pt-24 md:px-24 md:pt-40 lg:px-100'>
        {/* 헤더 */}
        <div className='flex space-x-16'>
          <div>
            <HeadClass className='h-72 w-72' />
          </div>
          <div className='space-y-8'>
            <div className='text-14 font-medium'>함께 할 사람이 없나요?</div>
            <div className='text-[18px] font-semibold md:text-24'>
              지금 모임에 참여해보세요
            </div>
          </div>
        </div>

        {/* 구분선 넣기 위한 div */}
        <div className='divide-y'>
          <div>
            {/* 탭 */}
            <div className='mt-32 flex justify-between'>
              <div className='flex space-x-12'>
                <Tab
                  type='dalaemfit'
                  isActive={activeTab === 'dalaemfit'}
                  onClick={() => handleTabClick('dalaemfit')}
                />
                <Tab
                  type='workation'
                  isActive={activeTab === 'workation'}
                  onClick={() => handleTabClick('workation')}
                />
              </div>
              <div className='w-[100px] md:w-[115px]'>
                <Button name='모임 만들기' variant='default' />
              </div>
            </div>

            {/* 버튼 탭 */}
            <div className='mt-8 space-x-8 py-16'>
              <Chip state='active'>전체</Chip>
              <Chip state='default'>오피스 스트레칭</Chip>
              <Chip state='default'>마인드풀니스</Chip>
            </div>
          </div>

          {/* 드롭다운 */}
          <div className='flex justify-between pt-16'>
            <div className='flex space-x-8'>
              <FilterList state='default' options={OPTIONS}>
                지역 전체
              </FilterList>
              {/* TODO: 클릭 시 date picker 추가 */}
              <FilterList state='default'>날짜 전체</FilterList>
            </div>
            <div>
              <FilterSort state='default' options={SORT_OPTIONS}>
                마감임박
              </FilterSort>
            </div>
          </div>
        </div>

        {/* 카드 리스트 */}
        <div className='mt-24 space-y-24'>
          {/* 모임이 없는 경우 */}
          {/* <div className='flex h-[400px] items-center justify-center'>
            <p className='text-center text-14 font-medium text-var-gray-500'>
              아직 모임이 없어요.
              <br />
              지금 바로 모임을 만들어보세요.
            </p>
          </div> */}

          {/* 모임이 있는 경우 */}
          <CardList data={mockData} />
          <CardList data={mockData} />
          <CardList data={mockData} />
          <CardList data={mockData} />
          <CardList data={mockData} />
        </div>
      </div>
    </div>
  );
};

export default GatheringsPage;
