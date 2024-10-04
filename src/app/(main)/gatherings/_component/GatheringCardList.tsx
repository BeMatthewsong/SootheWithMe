import { useEffect, useState } from 'react';
import Link from 'next/link';

import CardList from '@/app/components/CardList/CardList';
import { GatheringsListData } from '@/types/data.type';
import { useSavedGatheringList } from '@/context/SavedGatheringContext';

import { useInView } from 'react-intersection-observer';

interface GatheringCardListProps {
  gatherings: GatheringsListData[];
}

const GatheringCardList = ({ gatherings }: GatheringCardListProps) => {
  const { savedGatherings, updateGathering } = useSavedGatheringList();

  const isSaved = (id: number) => savedGatherings.includes(id);

  const handleButtonClick = (id: number) => {
    updateGathering(id);
  };

  const [topGradientVisible, setTopGradientVisible] = useState(false);
  const [bottomGradientVisible, setBottomGradientVisible] = useState(false);

  const { ref: firstGatheringRef, inView: firstInView } = useInView({
    threshold: 0,
  });
  const { ref: lastGatheringRef, inView: lastInView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    setTopGradientVisible(!firstInView);
    setBottomGradientVisible(!lastInView);
  }, [firstInView, lastInView]);

  return (
    <div className='gathering-list mt-24 space-y-24'>
      {/* Top gradient */}
      <div
        className={`fixed left-0 right-0 top-56 z-[30] h-16 bg-gradient-to-b from-white to-transparent p-10 transition-opacity duration-500 ease-in-out md:top-60 ${
          topGradientVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Bottom gradient */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[30] h-16 bg-gradient-to-t from-white to-transparent p-10 transition-opacity duration-500 ease-in-out ${
          bottomGradientVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* 모임이 없는 경우 */}
      {gatherings.length === 0 ? (
        <div className='flex h-[400px] items-center justify-center'>
          <p className='text-center text-14 font-medium text-var-gray-500'>
            아직 모임이 없어요.
            <br />
            지금 바로 모임을 만들어보세요.
          </p>
        </div>
      ) : (
        gatherings.map((gathering, index) => (
          <div
            key={gathering.id}
            ref={
              index === 0
                ? firstGatheringRef
                : index === gatherings.length - 1
                  ? lastGatheringRef
                  : null
            }
          >
            <Link href={`/gatherings/${gathering.id}`}>
              <CardList
                data={gathering}
                isSaved={isSaved(gathering.id)}
                handleButtonClick={handleButtonClick}
              />
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default GatheringCardList;
