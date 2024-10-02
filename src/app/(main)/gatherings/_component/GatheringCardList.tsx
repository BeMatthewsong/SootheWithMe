import Link from 'next/link';

import CardList from '@/app/components/CardList/CardList';
import { GatheringsListData } from '@/types/data.type';
import { useSavedGatheringList } from '@/context/SavedGatheringContext';

interface GatheringCardListProps {
  gatherings: GatheringsListData[];
}

const GatheringCardList = ({ gatherings }: GatheringCardListProps) => {
  const { savedGatherings, updateGathering } = useSavedGatheringList();

  const isSaved = (id: number) => savedGatherings.includes(id);

  const handleButtonClick = (id: number) => {
    updateGathering(id);
  };

  return (
    <div className='mt-24 space-y-24'>
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
        gatherings.map((gathering) => (
          <div key={gathering.id}>
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
