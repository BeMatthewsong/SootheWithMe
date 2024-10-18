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
        renderItem={(item) => {
          // 주최자인지 여부를 확인하는 변수
          const isHost = item.createdBy === user?.id;
          return (
            <Card data={item}>
              <Card.Chips />
              <Card.Info />
              {isHost ? (
                // 주최자일 때 렌더링
                item.isCompleted && (
                  <Card.Button
                    handleButtonClick={() => {
                      handleOpenModal(item.id);
                    }}
                  />
                )
              ) : (
                // 참가자일 때 렌더링
                <Card.Button
                  handleButtonClick={() => {
                    item.isCompleted
                      ? handleOpenModal(item.id)
                      : handleWithdrawClickWithId(item.id, queries.joined._def);
                  }}
                />
              )}
            </Card>
          );
        }}
      />
      {isModalOpen && (
        <ReviewModal gatheringId={cardId} onClose={handleCloseModal} />
      )}
    </MotionWrapper>
  );
};

export default MyGatheringList;
