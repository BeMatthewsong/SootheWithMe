'use client';

import getMyGathergins from '@/app/api/gatherings/service/getMyGathergins';
import Card from '@/app/components/Card/Card';
import InfiniteScroll from '@/app/components/InfiniteScroll/InfiniteScroll';
import ReviewModal from '@/app/components/Modal/ReviewModal';
import { useState } from 'react';
import { UserJoinedGatheringsData } from '@/types/data.type';
import useParticipation from '@/hooks/useParticipation';
import { UserData } from '@/types/client.type';

interface MyGatheringListProps {
  user: UserData | null;
  initData: UserJoinedGatheringsData[];
}

const MyGatheringList = ({ initData, user }: MyGatheringListProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [cardId, setCardId] = useState<number>(0);
  const { handleWithdrawClickWithId } = useParticipation(user);

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
        initData={initData}
        queryKey={['myGatherings']}
        queryFn={getMyGathergins}
        emptyText='아직 참여한 모임이 없습니다.'
        errorText='모임을 불러오지 못했습니다.'
        renderItem={(item, index) => (
          <Card data={item}>
            <Card.Chips />
            <Card.Info />
            <Card.Button
              handleButtonClick={() => {
                item.isCompleted
                  ? handleOpenModal(item.id)
                  : handleWithdrawClickWithId(item.id, ['myGatherings']);
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
