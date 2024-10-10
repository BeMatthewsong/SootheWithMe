'use client';

import CardList from '@/app/components/CardList/CardList';
import { useSavedGatheringList } from '@/context/SavedGatheringContext';
import { GatheringType } from '@/types/data.type';
import Link from 'next/link';

interface SavedListProps {
  dataList: GatheringType[];
}

const SavedList = ({ dataList }: SavedListProps) => {
  const { savedGatherings, updateGathering } = useSavedGatheringList();

  const isSaved = (id: number) => savedGatherings.includes(id);

  const handleButtonClick = (id: number) => {
    updateGathering(id);
  };

  return (
    <>
      {dataList.map((item) => (
        <Link href={`/gatherings/${item.id}`} key={item.id}>
          <CardList
            data={item}
            isSaved={isSaved(item.id)}
            handleButtonClick={handleButtonClick}
          />
        </Link>
      ))}
    </>
  );
};

export default SavedList;
