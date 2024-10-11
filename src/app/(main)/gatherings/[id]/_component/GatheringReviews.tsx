'use client';

import Pagination from '@/app/components/Pagination/Pagination';
import Review from '@/app/components/Review/Review';
import { REVIEWS_PER_PAGE } from '@/constants/common';
import { ReviewsType } from '@/types/data.type';

interface GatheringReviewsProps {
  reviews: ReviewsType[];
  currentPage: number;
  handlePageChange: (page: number) => void;
}

const GatheringReviews = ({
  reviews,
  currentPage,
  handlePageChange,
}: GatheringReviewsProps) => {
  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
  const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
  const currentReviews = reviews.slice(
    startIndex,
    startIndex + REVIEWS_PER_PAGE,
  );

  return (
    <div className='mt-24 border-t-2 p-24 dark:border-neutral-700'>
      <div className='text-[18px] font-semibold'>
        이용자들은 이 프로그램을 이렇게 느꼈어요!
      </div>
      <div>
        {reviews.length === 0 ? (
          <div className='flex h-[400px] items-center justify-center'>
            <p className='text-center text-14 font-medium text-var-gray-500 dark:text-neutral-200'>
              아직 리뷰가 없어요.
            </p>
          </div>
        ) : (
          currentReviews.map((currentReview) => (
            <div key={currentReview.id} className='pb-16 pt-16'>
              <Review
                rating={currentReview.score}
                description={currentReview.comment}
                user_name={currentReview.User.name}
                date={currentReview.createdAt}
              />
            </div>
          ))
        )}
      </div>

      {/* 페이지네이션 */}
      {reviews.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default GatheringReviews;
