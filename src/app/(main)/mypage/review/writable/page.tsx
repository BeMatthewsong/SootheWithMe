'use client';

import getJoinedGatherings from '@/app/api/actions/gatherings/getJoinedGathering';
import Card from '@/app/components/Card/Card';
import ReviewModal from '@/app/components/Modal/ReviewModal';
import usePreventScroll from '@/hooks/usePreventScroll';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import EmptyReviewPage from '../../_component/EmptyReviewPage';
import ReviewFilterTab from '../../_component/ReviewFilterTab';
import { queries } from '@/queries';
import useScrollGradientEffect from '@/hooks/useScrollGradientEffect';
import GradientOverlay from '@/app/components/GradientOverlay/GradientOverlay';
import MotionWrapper from '@/app/components/MotionWrapper/MotionWrapper';

const WritableReviewsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [cardId, setCardId] = useState<number>(0);

  const { data: writableReviews } = useQuery({
    ...queries.writableReview.all(),
    queryFn: () => getJoinedGatherings({ completed: true, reviewed: false }),
  });

  const handleOpenModal = (id: number) => {
    setCardId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  usePreventScroll(isModalOpen);

  const {
    topGradientVisible,
    bottomGradientVisible,
    firstItemRef: firstReviewRef,
    lastItemRef: lastReviewRef,
  } = useScrollGradientEffect();

  return (
    <>
      <div className='grow pt-16'>
        {/* tab */}
        <ReviewFilterTab />

        <GradientOverlay position='top' isVisible={topGradientVisible} />
        <GradientOverlay position='bottom' isVisible={bottomGradientVisible} />

        {/* cards */}
        {writableReviews?.length ? (
          writableReviews.map((data, index) => (
            <MotionWrapper key={data.id}>
              <div
                ref={
                  index === 0
                    ? firstReviewRef
                    : index === writableReviews.length - 1
                      ? lastReviewRef
                      : null
                }
              >
                <Card data={data}>
                  <Card.Chips />
                  <Card.Info />
                  <Card.Button
                    handleButtonClick={() =>
                      data.isCompleted && handleOpenModal(data.id)
                    }
                  />
                </Card>
              </div>
            </MotionWrapper>
          ))
        ) : (
          <EmptyReviewPage />
        )}
      </div>

      {isModalOpen && (
        <ReviewModal gatheringId={cardId} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default WritableReviewsPage;
