'use client';

import { useEffect, useState } from 'react';

import Filters from './Filters';
import GatheringCardList from './GatheringCardList';
import Tabs from '@/app/components/Tabs/Tabs';
import Chips from '@/app/components/Chips/Chips';
import CreateGatheringButton from './CreateGatheringButton';
import MakeGatheringModal from '@/app/components/Modal/MakeGatheringModal';
import useGatherings from '@/hooks/useGatherings';
import usePreventScroll from '@/hooks/usePreventScroll';
import { GatheringsListData } from '@/types/data.type';
import { useInView } from 'react-intersection-observer';

interface ClientSideGatheringsProps {
  gatherings: GatheringsListData[];
}

const ClientSideGatherings = ({ gatherings }: ClientSideGatheringsProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { ref, inView } = useInView({ threshold: 1.0 });

  const {
    filteredData,
    activeTab,
    handleTabClick,
    handleChipClick,
    handleLocationChange,
    handleDateChange,
    handleSortChange,
    loadMore,
    isLoading,
    hasMore,
  } = useGatherings(gatherings);

  usePreventScroll(isModalOpen);

  useEffect(() => {
    if (inView && hasMore) {
      loadMore();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasMore]);

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

      {/* TODO: Spinner 넣기 */}
      {isLoading && <p>로딩 스피너</p>}

      {hasMore && <div ref={ref} className='h-20' />}

      {isModalOpen && (
        <MakeGatheringModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default ClientSideGatherings;
