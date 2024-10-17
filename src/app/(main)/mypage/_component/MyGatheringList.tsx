'use client';

import getMyGatherings from '@/app/api/gatherings/service/getMyGatherings';
import Card from '@/app/components/Card/Card';
import InfiniteScroll from '@/app/components/InfiniteScroll/InfiniteScroll';
import ReviewModal from '@/app/components/Modal/ReviewModal';
import MotionWrapper from '@/app/components/MotionWrapper/MotionWrapper';
import useParticipation from '@/hooks/useParticipation';
import { queries } from '@/queries';
import { UserData } from '@/types/client.type';
import { UserJoinedGatheringsData } from '@/types/data.type';
import { useState } from 'react';

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
    <MotionWrapper>
      <InfiniteScroll
        initData={initData}
        queryKey={queries.joined._def}
        queryFn={getMyGatherings}
        emptyText='아직 참여한 모임이 없습니다.'
        errorText='모임을 불러오지 못했습니다.'
        renderItem={(item) => (
          <Card data={item}>
            <Card.Chips />
            <Card.Info />
            <Card.Button
              handleButtonClick={() => {
                item.isCompleted
                  ? handleOpenModal(item.id)
                  : handleWithdrawClickWithId(item.id, queries.joined._def);
              }}
            />
          </Card>
        )}
      />
      {isModalOpen && (
        <ReviewModal gatheringId={cardId} onClose={handleCloseModal} />
      )}
    </MotionWrapper>
  );
};

export default MyGatheringList;
