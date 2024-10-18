'use client';

import Link from 'next/link';
import CardList from '@/app/components/CardList/CardList';
import GradientOverlay from '@/app/components/GradientOverlay/GradientOverlay';
import { useSavedGatheringList } from '@/context/SavedGatheringContext';
import useScrollGradientEffect from '@/hooks/useScrollGradientEffect';
import { GatheringType } from '@/types/data.type';

interface SavedListProps {
  dataList: GatheringType[];
}

const SavedList = ({ dataList }: SavedListProps) => {
  const { savedGatherings, updateGathering } = useSavedGatheringList();

  const isSaved = (id: number) => savedGatherings.includes(id);

  const handleButtonClick = (id: number) => {
    updateGathering(id);
  };

  const {
    topGradientVisible,
    bottomGradientVisible,
    firstItemRef: firstGatheringRef,
    lastItemRef: lastGatheringRef,
  } = useScrollGradientEffect();

  return (
    <>
      <GradientOverlay position='top' isVisible={topGradientVisible} />
      <GradientOverlay position='bottom' isVisible={bottomGradientVisible} />

      {dataList.map((item, index) => (
        <div
          key={item.id}
          className='mb-24'
          ref={
            index === 0
              ? firstGatheringRef
              : index === dataList.length - 1
                ? lastGatheringRef
                : null
          }
        >
          <Link href={`/gatherings/${item.id}`} key={item.id}>
            <CardList
              data={item}
              isSaved={isSaved(item.id)}
              handleButtonClick={handleButtonClick}
            />
          </Link>
        </div>
      ))}
    </>
  );
};

export default SavedList;
