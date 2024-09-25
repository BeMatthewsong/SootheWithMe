'use client';

import { useState } from 'react';

import Filters from './Filters';
import GatheringCardList from './GatheringCardList';
import Tabs from '@/app/components/Tabs/Tabs';
import Chips from '@/app/components/Chips/Chips';
import CreateGatheringButton from './CreateGatheringButton';
import MakeGatheringModal from '@/app/components/Modal/MakeGatheringModal';
import useGatherings from '@/hooks/useGatherings';
import usePreventScroll from '@/hooks/usePreventScroll';
import { GatheringsListData } from '@/types/data.type';

interface ClientSideGatheringsProps {
  gatherings: GatheringsListData[];
}

const ClientSideGatherings = ({ gatherings }: ClientSideGatheringsProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    filteredData,
    activeTab,
    handleTabClick,
    handleChipClick,
    handleLocationChange,
    handleDateChange,
    handleSortChange,
  } = useGatherings(gatherings);

  usePreventScroll(isModalOpen);

  return (
    <>
      <div className='divide-y'>
        <div className='mt-32'>
          <div className='flex justify-between'>
            <Tabs activeTab={activeTab} onTabClick={handleTabClick} />
            <CreateGatheringButton onClick={() => setIsModalOpen(true)} />
          </div>
          <Chips activeTab={activeTab} onChipClick={handleChipClick} />
        </div>
        <Filters
          onLocationChange={handleLocationChange}
          onDateChange={handleDateChange}
          onSortChange={handleSortChange}
        />
      </div>
      <GatheringCardList gatherings={filteredData} />

      {isModalOpen && (
        <MakeGatheringModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default ClientSideGatherings;
