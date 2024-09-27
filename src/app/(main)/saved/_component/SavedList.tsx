'use client';

import CardList from '@/app/components/CardList/CardList';
import { useSavedGatheringList } from '@/context/SavedGatheringContext';
import { GatheringsListData } from '@/types/data.type';

interface SavedListProps {
  dataList: GatheringsListData[];
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
        <CardList
          key={item.id}
          data={item}
          isSaved={isSaved(item.id)}
          handleButtonClick={handleButtonClick}
        />
      ))}
    </>
  );
};

export default SavedList;
