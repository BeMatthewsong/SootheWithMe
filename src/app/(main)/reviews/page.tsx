import Header from './_components/Hearder';
import ReviewFilters from './_components/ReviewFilters';
import ReviewList from './_components/ReviewList';
import getReviewList from '@/app/actions/reviews/getReviewList';
import Filter from '@/app/components/Filter/Filter';
import FilterDate from '@/app/components/Filter/FilterDate';
import getReviewScore from '@/app/actions/reviews/getReviewScore';
import ReviewScore from './_components/ReviewScore/ReviewScore';
import { LOCATION_OPTIONS, SORT_OPTIONS } from '@/constants/common';

const ReviewsPage = async () => {
  // Server side data fetching 최초 10개, type=dalaemfit
  let reviewList = await getReviewList();

  // 전체 리뷰 스코어
  let reviewScore = await getReviewScore({ type: 'DALLAEMFIT' });

  // TODO : 무한 스크롤로 추가 데이터 Fetching
  // TODO : 필터 옵션에 따른 데이터 필터링

  return (
    <main className='mx-auto flex h-full max-w-1200 flex-col bg-var-gray-50 px-16 pt-24 md:px-24 md:pt-40 lg:px-100'>
      <Header />

      <section className='mt-24 flex grow flex-col md:mt-32'>
        {/* filter */}
        <ReviewFilters />

        <div className='mb-16 w-full border-y border-var-gray-200' />
        {/* 별점칸 */}
        <ReviewScore initialScore={reviewScore} />

        {/* 데이터 */}
        <div className='mt-24 flex grow flex-col border-t-2 border-t-var-gray-900 bg-white p-24'>
          <div className='mb-24 flex items-center justify-between'>
            <div className='flex gap-8'>
              <Filter state='default' type='list' options={LOCATION_OPTIONS}>
                지역 선택
              </Filter>
              <FilterDate state='default'>날짜 선택</FilterDate>
            </div>
            <div>
              <Filter state='default' type='sort' options={SORT_OPTIONS}>
                정렬
              </Filter>
            </div>
          </div>
          {reviewList.length > 0 ? (
            <ReviewList reviewList={reviewList} />
          ) : (
            <div className='flex grow items-center justify-center text-14 font-medium text-var-gray-500'>
              아직 리뷰가 없어요
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ReviewsPage;
