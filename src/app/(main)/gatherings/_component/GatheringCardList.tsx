import Link from 'next/link';
import CardList from '@/app/components/CardList/CardList';
import GradientOverlay from '@/app/components/GradientOverlay/GradientOverlay';
import { GatheringType } from '@/types/data.type';
import { useSavedGatheringList } from '@/context/SavedGatheringContext';
import MotionWrapper from '@/app/components/MotionWrapper/MotionWrapper';
import useScrollGradientEffect from '@/hooks/useScrollGradientEffect';

interface GatheringCardListProps {
  gatherings: GatheringType[];
}

const GatheringCardList = ({ gatherings }: GatheringCardListProps) => {
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
    <div className='gathering-list mt-24 space-y-24'>
      <GradientOverlay position='top' isVisible={topGradientVisible} />
      <GradientOverlay position='bottom' isVisible={bottomGradientVisible} />

      {/* 모임이 없는 경우 */}
      {gatherings.length === 0 ? (
        <div className='flex h-[400px] items-center justify-center'>
          <p className='text-center text-14 font-medium text-var-gray-500 dark:text-neutral-200'>
            아직 모임이 없어요.
            <br />
            지금 바로 모임을 만들어보세요.
          </p>
        </div>
      ) : (
        gatherings.map((gathering, index) => (
          <MotionWrapper key={gathering.id}>
            <div
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
          </MotionWrapper>
        ))
      )}
    </div>
  );
};

export default GatheringCardList;
