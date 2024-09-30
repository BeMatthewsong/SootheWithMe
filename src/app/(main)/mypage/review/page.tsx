'use client';

import { useUser } from '@/app/(auth)/context/UserContext';
import getJoinedGatherings from '@/app/api/actions/gatherings/getJoinedGathering';
import getReviewList from '@/app/api/actions/reviews/getReviewList';
import Card from '@/app/components/Card/Card';
import ReviewModal from '@/app/components/Modal/ReviewModal';
import Review from '@/app/components/Review/Review';
import { MYPAGE_REVIEW_TABS } from '@/constants/common';
import usePreventScroll from '@/hooks/usePreventScroll';
import { useQueries } from '@tanstack/react-query';
import { useState } from 'react';
import ReviewFilterButtons from '../_component/ReviewFilterButtons';

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<string>(
    MYPAGE_REVIEW_TABS.WRITABLE,
  );
  const [cardId, setCardId] = useState<number>(0);

  const { user } = useUser();

  const results = useQueries({
    queries: [
      {
        queryKey: ['writableReviews'],
        queryFn: () => getJoinedGatherings(),
      },
      {
        queryKey: ['myreviews'],
        queryFn: () =>
          getReviewList({
            userId: Number(user?.id),
            sortBy: 'createdAt',
            sortOrder: 'desc',
          }),
      },
    ],
  });

  const writableReviewData = results[0].data;
  const reviewData = results[1].data;

  const filteredData = Array.isArray(writableReviewData)
    ? writableReviewData.filter((data) => {
        switch (filterType) {
          case MYPAGE_REVIEW_TABS.WRITABLE: // 작성 가능한 리뷰
            return data?.isCompleted && !data?.isReviewed;
          case MYPAGE_REVIEW_TABS.WRITTEN: // 작성한 리뷰
            return data?.isCompleted && data?.isReviewed;
          default:
            return true;
        }
      })
    : [];

  const handleOpenModal = (id: number) => {
    setCardId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  usePreventScroll(isModalOpen);

  return (
    <>
      <div className='grow pt-16'>
        {/* chips */}
        <ReviewFilterButtons
          filterType={filterType}
          setFilterType={setFilterType}
        />
        {/* cards */}
        {/* 전체 혹은 작성 가능한 리뷰 */}
        {filterType === MYPAGE_REVIEW_TABS.WRITABLE && filteredData?.length ? (
          filteredData.map((data) => (
            <Card key={data.id} data={data}>
              <Card.Chips />
              <Card.Info />
              <Card.Button
                handleButtonClick={() =>
                  data.isCompleted && handleOpenModal(data.id)
                }
              />
            </Card>
          ))
        ) : (
          <EmptyPage />
        )}
        {/* 작성한 리뷰 */}
        <div className='my-24 flex flex-col gap-24'>
          {filterType === MYPAGE_REVIEW_TABS.WRITTEN && reviewData?.length ? (
            reviewData.map((review) => (
              <Review
                key={review.id}
                rating={review.score}
                image_source={review.Gathering.image}
                description={review.comment}
                user_name={review.User.name}
                date={review.createdAt}
              />
            ))
          ) : (
            <EmptyPage />
          )}
        </div>
      </div>

      {isModalOpen && (
        <ReviewModal gatheringId={cardId} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default Page;

const EmptyPage = () => {
  return (
    <div className='flex h-full items-center justify-center'>
      <p className='text-center text-14 font-medium text-var-gray-500'>
        아직 작성한 리뷰가 없어요
      </p>
    </div>
  );
};
