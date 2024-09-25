'use client';

import getMyGathergins from '@/app/api/gatherings/service/getMyGathergins';
import Card from '@/app/components/Card/Card';
import InfiniteScroll from '@/app/components/InfiniteScroll/InfiniteScroll';

const MyGatheringList = () => {
  return (
    <InfiniteScroll
      queryKey={['myGatherings']}
      queryFn={getMyGathergins}
      emptyText='아직 참여한 모임이 없습니다.'
      renderItem={(item, index) => (
        <Card handleSaveDiscard={() => console.log('Save Discard')} data={item}>
          <Card.Chips />
          <Card.Info />
          <Card.Button
            handleButtonClick={() => {
              item.isCompleted
                ? console.log('Write review')
                : console.log('Cancel gathering');
            }}
          />
        </Card>
      )}
    />
  );
};

export default MyGatheringList;
