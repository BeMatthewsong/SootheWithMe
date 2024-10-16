import { getUserData } from '@/app/api/actions/mypage/getUserData';
import getReviewList from '@/app/api/actions/reviews/getReviewList';
import { redirect } from 'next/navigation';
import EmptyReviewPage from '../../_component/EmptyReviewPage';
import ReviewFilterTab from '../../_component/ReviewFilterTab';
import ReviewsList from './_component/ReviewsList';

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
        <ReviewsList writtenReviews={writtenReviews} />
      ) : (
        <EmptyReviewPage />
      )}
    </div>
  );
};

export default WrittenReviewsPage;
