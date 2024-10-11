import { useState } from 'react';

import { IconSaveActive, IconSaveInactive } from '@/public/icons';
import { useSavedGatheringList } from '@/context/SavedGatheringContext';

interface InformationCardHeaderProps {
  title: string;
  address: string;
  gatheringId: number;
}

const InformationCardHeader = ({
  title,
  address,
  gatheringId,
}: InformationCardHeaderProps) => {
  const { savedGatherings, updateGathering } = useSavedGatheringList();

  const checkGatheringSaved = (id: number | undefined, savedList: number[]) => {
    return id ? savedList.includes(id) : false;
  };

  const [isSaved, setIsSaved] = useState<boolean>(() =>
    checkGatheringSaved(gatheringId, savedGatherings),
  );

  const handleToggleSave = () => {
    setIsSaved((prev) => !prev);
    if (gatheringId) {
      updateGathering(gatheringId);
    }
  };

  return (
    <div className='flex justify-between'>
      <div>
        <div className='text-[18px] font-semibold' data-testid='title'>
          {title}
        </div>
        <div className='text-[14px] font-medium' data-testid='address'>
          {address}
        </div>
      </div>

      {isSaved ? (
        <IconSaveActive
          className='h-48 w-48 animate-heartPulse cursor-pointer'
          onClick={handleToggleSave}
        />
      ) : (
        <IconSaveInactive
          className='h-48 w-48 cursor-pointer'
          onClick={handleToggleSave}
        />
      )}
    </div>
  );
};

export default InformationCardHeader;
