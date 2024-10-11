import { getUserData } from '@/app/api/actions/mypage/getUserData';
import getReviewList from '@/app/api/actions/reviews/getReviewList';
import Review from '@/app/components/Review/Review';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import EmptyReviewPage from '../../_component/EmptyReviewPage';
import ReviewFilterTab from '../../_component/ReviewFilterTab';

const WrittenReviewsPage = async () => {
  const user = await getUserData();

  if (!user) {
    redirect('/signin');
  }

  const writtenReviews = await getReviewList({
    userId: user?.id as number,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  return (
    <div className='grow pt-16'>
      {/* tab */}
      <ReviewFilterTab />

      {/* cards */}
      {writtenReviews?.length ? (
        <div className='my-24 flex flex-col gap-24'>
          {writtenReviews.map((review) => (
            <Link href={`/gatherings/${review.Gathering.id}`} key={review.id}>
              <Review
                key={review.id}
                rating={review.score}
                image_source={review.Gathering.image}
                description={review.comment}
                user_name={review.User.name}
                date={review.createdAt}
              />
            </Link>
          ))}
        </div>
      ) : (
        <EmptyReviewPage />
      )}
    </div>
  );
};

export default WrittenReviewsPage;
