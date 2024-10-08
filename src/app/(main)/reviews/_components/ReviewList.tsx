import Review from '@/app/components/Review/Review';
import { ReviewsType } from '@/types/data.type';
import Loader from '@/app/components/Loader/Loader';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

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

  return (
    <div className='mt-24 space-y-12'>
      {reviewList.flatMap((list) =>
        list.map((item, index) => (
          <Link
            href={`/gatherings/${item.Gathering.id}`}
            key={item.id}
            className='block'
          >
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
        )),
      )}

      {isLoading && (
        <div className='flex items-center justify-center pt-24'>
          <Loader />
        </div>
      )}

      {hasMore && <div ref={ref} className='h-24' />}
    </div>
  );
};

export default ReviewList;
