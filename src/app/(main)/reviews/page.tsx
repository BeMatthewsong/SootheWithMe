'use client';

import { HeadReview } from '@/public/images';
import { useState } from 'react';
import { OPTIONS, SORT_OPTIONS, tempData } from './mockData';
import Scores from './_components/Scores';
import AverageRating from './_components/AverageRating';
import Tab from '@/app/components/Tab/Tab';
import Chip from '@/app/components/Chip/Chip';
import Review from '@/app/components/Review/Review';
import FilterList from '@/app/components/Filter/FilterList';
import FilterSort from '@/app/components/Filter/FilterSort';

const ReviewsPage = () => {
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
    <main className='mx-auto flex h-full max-w-1200 flex-col bg-var-gray-50 px-16 pt-24 md:px-24 md:pt-40 lg:px-100'>
      {/* head */}
      <div className='flex items-center gap-16'>
        <HeadReview className='h-72 w-72' />
        <div>
          <h2 className='mb-8 text-18 font-semibold text-var-gray-900'>
            모든 리뷰
          </h2>
          <p className='text-14 font-medium text-var-gray-700'>
            같이달램을 이용한 분들은 이렇게 느꼈어요 🙌
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
        {/* filter */}
        <div className='flex flex-col gap-16'>
          <div
            className={`flex items-center gap-8 ${activeTab === 'workation' ? 'hidden' : ''}`}
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
          {/* 별점칸 */}
          <div className='flex items-center justify-center border-y-2 border-var-gray-200 bg-white p-32'>
            <div className='flex w-full items-center justify-between gap-24 md:w-auto md:gap-120 lg:w-612'>
              <AverageRating />
              <Scores />
            </div>
          </div>
        </div>
        {/* 데이터 */}
        <div className='mt-24 border-t-2 border-t-var-gray-900 bg-white p-24'>
          <div className='mb-24 flex items-center justify-between'>
            <div className='flex gap-8'>
              <FilterList state='default' options={OPTIONS}>
                지역 선택
              </FilterList>
              <FilterList state='default'>날짜 선택</FilterList>
            </div>
            <div>
              <FilterSort state='default' options={SORT_OPTIONS}>
                최신순
              </FilterSort>
            </div>
          </div>

          <div className='space-y-12'>
            {tempData.map((item, index) => (
              <Review
                image_source={item.image_source}
                rating={item.rating}
                description={item.description}
                place={item.place}
                location={item.location}
                user_name={item.user_name}
                date={item.date}
                key={index}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ReviewsPage;
