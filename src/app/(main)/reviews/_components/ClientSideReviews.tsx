'use client';

import { useEffect } from 'react';
import toast from 'react-hot-toast';
import Tabs from '@/app/components/Tabs/Tabs';
import ReviewList from './ReviewList';
import ReviewScore from './ReviewScore/ReviewScore';
import Chips from '@/app/components/Chips/Chips';
import Filters from '@/app/components/Filters/Filters';
import { ReviewScoreType, ReviewsType } from '@/types/data.type';
import useReviews from '@/hooks/useReviews/useReveiws';
import { REVIEW_SORT_OPTIONS } from '@/constants/common';

interface ClientSideReviewsProps {
  initialReviewList: ReviewsType[];
  initialReviewScore: ReviewScoreType[];
}

const ClientSideReviews = ({
  initialReviewList,
  initialReviewScore,
}: ClientSideReviewsProps) => {
  const {
    filteredData,
    score,
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
    isError,
    error,
  } = useReviews(initialReviewList, initialReviewScore);

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || '오류가 발생했습니다.');
    }
  }, [isError, error]);

  return (
    <section className='mt-24 flex grow flex-col md:mt-32'>
      <Tabs activeTab={activeTab} onTabClick={handleTabClick} />
      <Chips
        activeTab={activeTab}
        activeChip={selectedChip}
        onChipClick={handleChipClick}
      />

      <div className='mb-16 w-full border-y border-var-gray-200 dark:border-neutral-700' />

      {/* 별점칸 */}
      <ReviewScore score={score} />

      <div
        className={`mt-24 flex grow flex-col border-t-2 border-t-var-gray-900 bg-white px-24 pt-8 dark:border-neutral-700 dark:bg-transparent ${!hasMore && 'pb-24'}`}
      >
        <Filters
          onLocationChange={handleLocationChange}
          onDateChange={handleDateChange}
          onSortChange={handleSortChange}
          sortOptions={REVIEW_SORT_OPTIONS}
        />

        {filteredData[0].length > 0 ? (
          <ReviewList
            reviewList={filteredData}
            loadMore={loadMore}
            isLoading={isLoading}
            hasMore={hasMore}
          />
        ) : (
          <div className='flex grow items-center justify-center text-14 font-medium text-var-gray-500 dark:text-neutral-200'>
            아직 리뷰가 없어요
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientSideReviews;
