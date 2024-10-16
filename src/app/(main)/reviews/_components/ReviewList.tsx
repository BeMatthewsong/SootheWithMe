import { useEffect } from 'react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import Review from '@/app/components/Review/Review';
import Loader from '@/app/components/Loader/Loader';
import GradientOverlay from '@/app/components/GradientOverlay/GradientOverlay';
import { ReviewsType } from '@/types/data.type';
import useScrollGradientEffect from '@/hooks/useScrollGradientEffect';
import MotionWrapper from '@/app/components/MotionWrapper/MotionWrapper';

interface ReviewListProps {
  reviewList: ReviewsType[][];
  loadMore: () => void;
  isLoading: boolean;
  hasMore: boolean;
}

const ReviewList = ({
  reviewList,
  loadMore,
  isLoading,
  hasMore,
}: ReviewListProps) => {
  const { ref, inView } = useInView({ threshold: 1.0 });

  useEffect(() => {
    if (inView && hasMore) {
      loadMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasMore]);

  const {
    topGradientVisible,
    bottomGradientVisible,
    firstItemRef: firstReviewRef,
    lastItemRef: lastReviewRef,
  } = useScrollGradientEffect();

  return (
    <div className='mt-24 space-y-12'>
      <GradientOverlay position='top' isVisible={topGradientVisible} />
      <GradientOverlay position='bottom' isVisible={bottomGradientVisible} />

      {reviewList.flatMap((list) =>
        list.map((item, index) => (
          <MotionWrapper key={item.id}>
            <div
              ref={
                index === 0
                  ? firstReviewRef
                  : index === reviewList.length - 1
                    ? lastReviewRef
                    : null
              }
              data-testid='review-item'
            >
              <Link href={`/gatherings/${item.Gathering.id}`} className='block'>
                <Review
                  image_source={item.Gathering.image}
                  rating={item.score}
                  description={item.comment}
                  place={item.Gathering.name}
                  location={item.Gathering.location}
                  user_name={item.User.name}
                  date={item.createdAt}
                />
              </Link>
            </div>
          </MotionWrapper>
        )),
      )}

      {isLoading && (
        <div className='flex items-center justify-center pt-24'>
          <Loader />
        </div>
      )}

      {hasMore && <div ref={ref} className='h-24' data-testid='hasMoreRef' />}
    </div>
  );
};

export default ReviewList;
