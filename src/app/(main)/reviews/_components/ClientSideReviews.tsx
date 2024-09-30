'use client';

import ReviewList from './ReviewList';
import ReviewScore from './ReviewScore/ReviewScore';
import { ReviewScoreType, ReviewsType } from '@/types/data.type';
import useReviews from '@/hooks/useReveiws';
import Tabs from '@/app/components/Tabs/Tabs';
import Chips from './Chips';
import Filters from './Filters';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

interface ClientSideReviewsProps {
  reviewListData: ReviewsType[];
  reviewScoreData: ReviewScoreType[];
}

const ClientSideReviews = ({
  reviewListData,
  reviewScoreData,
}: ClientSideReviewsProps) => {
  const { ref, inView } = useInView({ threshold: 1.0 });

  const {
    filteredData,
    filteredSortData,
    activeTab,
    selectedChip,
    handleTabClick,
    handleChipClick,
    handleLocationChange,
    handleDateChange,
    handleSortChange,
    loadMore,
    isLoading,
    hasMore,
  } = useReviews(reviewListData, reviewScoreData);

  useEffect(() => {
    if (inView && hasMore) {
      loadMore();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasMore]);

  return (
    <section className='mt-24 flex grow flex-col md:mt-32'>
      <Tabs activeTab={activeTab} onTabClick={handleTabClick} />
      <Chips
        activeTab={activeTab}
        activeChip={selectedChip}
        onChipClick={handleChipClick}
      />

      <div className='mb-16 w-full border-y border-var-gray-200' />

      {/* 별점칸 */}
      <ReviewScore initialScore={filteredSortData} />

      <div className='mt-24 flex grow flex-col border-t-2 border-t-var-gray-900 bg-white p-24 pt-8'>
        <Filters
          onLocationChange={handleLocationChange}
          onDateChange={handleDateChange}
          onSortChange={handleSortChange}
        />

        {filteredData.length > 0 ? (
          <>
            <ReviewList reviewList={filteredData} />

            {isLoading && <p>로딩...</p>}

            {hasMore && <div ref={ref} className='h-20' />}
          </>
        ) : (
          <div className='flex grow items-center justify-center text-14 font-medium text-var-gray-500'>
            아직 리뷰가 없어요
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientSideReviews;
