'use client';

import Link from 'next/link';
import GradientOverlay from '@/app/components/GradientOverlay/GradientOverlay';
import Review from '@/app/components/Review/Review';
import useScrollGradientEffect from '@/hooks/useScrollGradientEffect';
import { ReviewsType } from '@/types/data.type';

const ReviewsList = ({ writtenReviews }: { writtenReviews: ReviewsType[] }) => {
  const {
    topGradientVisible,
    bottomGradientVisible,
    firstItemRef: firstReviewRef,
    lastItemRef: lastReviewRef,
  } = useScrollGradientEffect();

  return (
    <div className='my-24 flex flex-col gap-24'>
      <GradientOverlay position='top' isVisible={topGradientVisible} />
      <GradientOverlay position='bottom' isVisible={bottomGradientVisible} />

      {writtenReviews.map((review, index) => (
        <div
          key={review.id}
          ref={
            index === 0
              ? firstReviewRef
              : index === writtenReviews.length - 1
                ? lastReviewRef
                : null
          }
        >
          <Link href={`/gatherings/${review.Gathering.id}`}>
            <Review
              key={review.id}
              rating={review.score}
              image_source={review.Gathering.image}
              description={review.comment}
              user_name={review.User.name}
              date={review.createdAt}
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;
