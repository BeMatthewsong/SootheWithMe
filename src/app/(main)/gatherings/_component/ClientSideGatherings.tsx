'use client';

import { useState } from 'react';

import Filters from './Filters';
import GatheringCardList from './GatheringCardList';
import Tabs from '@/app/components/Tabs/Tabs';
import Chips from '@/app/components/Chips/Chips';
import CreateGatheringButton from './CreateGatheringButton';
import MakeGatheringModal from '@/app/components/Modal/MakeGatheringModal';
import usePreventScroll from '@/hooks/usePreventScroll';
import { GatheringsListData } from '@/types/data.type';
import fetchGatherings from '@/app/actions/gatherings/fetchGatherings';

interface ClientSideGatheringsProps {
  gatherings: GatheringsListData[];
}

const ClientSideGatherings = ({ gatherings }: ClientSideGatheringsProps) => {
  const [activeTab, setActiveTab] = useState<'WORKATION' | 'DALLAEMFIT'>(
    'DALLAEMFIT',
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [filteredData, setFilteredData] =
    useState<GatheringsListData[]>(gatherings);

  const handleTabClick = async (type: 'WORKATION' | 'DALLAEMFIT') => {
    setActiveTab(type);

    const newData = await fetchGatherings({ type });
    setFilteredData(newData);
  };

  const handleChipClick = async (
    label: 'ALL' | 'OFFICE_STRETCHING' | 'MINDFULNESS',
  ) => {
    const type = label === 'ALL' ? activeTab : label;

    const newData = await fetchGatherings({ type });
    setFilteredData(newData || []);
  };

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
        <Filters />
      </div>
      <GatheringCardList gatherings={filteredData} />

      {isModalOpen && (
        <MakeGatheringModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default ClientSideGatherings;
