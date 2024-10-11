'use client';

import getJoinedGatherings from '@/app/api/actions/gatherings/getJoinedGathering';
import Card from '@/app/components/Card/Card';
import ReviewModal from '@/app/components/Modal/ReviewModal';
import usePreventScroll from '@/hooks/usePreventScroll';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import EmptyReviewPage from '../../_component/EmptyReviewPage';
import ReviewFilterTab from '../../_component/ReviewFilterTab';

const WritableReviewsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [cardId, setCardId] = useState<number>(0);

  const { data: writableReviews } = useQuery({
    queryKey: ['reviews', 'writable'],
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

  return (
    <>
      <div className='grow pt-16'>
        {/* tab */}
        <ReviewFilterTab />

        {/* cards */}
        {writableReviews?.length ? (
          writableReviews.map((data) => (
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
