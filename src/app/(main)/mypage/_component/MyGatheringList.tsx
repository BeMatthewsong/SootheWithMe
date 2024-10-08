'use client';

import getMyGathergins from '@/app/api/gatherings/service/getMyGathergins';
import Card from '@/app/components/Card/Card';
import InfiniteScroll from '@/app/components/InfiniteScroll/InfiniteScroll';
import ReviewModal from '@/app/components/Modal/ReviewModal';
import { useState } from 'react';

const MyGatheringList = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [cardId, setCardId] = useState<number>(0);

  const handleOpenModal = (id: number) => {
    setCardId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <InfiniteScroll
        queryKey={['myGatherings']}
        queryFn={getMyGathergins}
        emptyText='아직 참여한 모임이 없습니다.'
        renderItem={(item, index) => (
          <Card
            handleSaveDiscard={() => console.log('Save Discard')}
            data={item}
          >
            <Card.Chips />
            <Card.Info />
            <Card.Button
              handleButtonClick={() => {
                item.isCompleted
                  ? handleOpenModal(item.id)
                  : console.log('Cancel gathering');
              }}
            />
          </Card>
        )}
      />
      {isModalOpen && (
        <ReviewModal gatheringId={cardId} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default MyGatheringList;
