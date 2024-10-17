'use client';

import Link from 'next/link';
import Card from '@/app/components/Card/Card';
import GradientOverlay from '@/app/components/GradientOverlay/GradientOverlay';
import useScrollGradientEffect from '@/hooks/useScrollGradientEffect';
import { GatheringType } from '@/types/data.type';
import MotionWrapper from '@/app/components/MotionWrapper/MotionWrapper';

interface GatheringListProps {
  dataList: GatheringType[];
}

const GatheringList = ({ dataList }: GatheringListProps) => {
  const updateDataList = () => {
    return dataList.map((item) => ({
      ...item,
      canceledAt: null,
    }));
  };

  const handleSaveDiscard = () => {
    throw new Error('잘못된 접근입니다.');
  };

  const {
    topGradientVisible,
    bottomGradientVisible,
    firstItemRef: firstGatheringRef,
    lastItemRef: lastGatheringRef,
  } = useScrollGradientEffect();

  return (
    <div className='grow'>
      <GradientOverlay position='top' isVisible={topGradientVisible} />
      <GradientOverlay position='bottom' isVisible={bottomGradientVisible} />

      {updateDataList().map((data, index) => (
        <MotionWrapper key={data.id}>
          <div
            ref={
              index === 0
                ? firstGatheringRef
                : index === updateDataList().length - 1
                  ? lastGatheringRef
                  : null
            }
          >
            <Link href={`/gatherings/${data.id}`}>
              <Card handleSaveDiscard={handleSaveDiscard} data={data}>
                <Card.Info />
              </Card>
            </Link>
          </div>
        </MotionWrapper>
      ))}
    </div>
  );
};

export default GatheringList;
