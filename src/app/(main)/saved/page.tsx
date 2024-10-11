'use client';

import Tabs from '@/app/components/Tabs/Tabs';
import Chips from '@/app/components/Chips/Chips';
import Filters from '@/app/components/Filters/Filters';
import Header from './_component/Header';
import SavedList from './_component/SavedList';
import useSavedGatherings from '@/hooks/useSavedGatherings';
import { useSavedGatheringList } from '@/context/SavedGatheringContext';
import { SORT_OPTIONS } from '@/constants/common';

const SavedPage = () => {
  const { savedGatherings } = useSavedGatheringList();

  const {
    gatheringListData,
    activeTab,
    activeChip,
    handleTabClick,
    handleChipClick,
    handleLocationChange,
    handleDateChange,
    handleSortChange,
  } = useSavedGatherings(savedGatherings);

  return (
    <main className='mx-auto flex h-full max-w-1200 flex-col bg-var-gray-50 px-16 pb-48 pt-24 md:px-24 md:pt-40 lg:px-100 dark:bg-neutral-900'>
      <Header />

      <section className='mt-24 flex grow flex-col md:mt-32'>
        <Tabs activeTab={activeTab} onTabClick={handleTabClick} />

        <div className='flex flex-col divide-y dark:divide-neutral-700'>
          <Chips
            activeTab={activeTab}
            activeChip={activeChip}
            onChipClick={handleChipClick}
          />

          <Filters
            onLocationChange={handleLocationChange}
            onDateChange={handleDateChange}
            onSortChange={handleSortChange}
            sortOptions={SORT_OPTIONS}
          />
        </div>

        {/* data list */}
        <div className='mt-24 flex grow flex-col gap-24'>
          {gatheringListData.length > 0 ? (
            <SavedList dataList={gatheringListData} />
          ) : (
            <div className='flex size-full grow items-center justify-center text-14 font-medium text-var-gray-500 dark:text-neutral-200'>
              아직 찜한 모임이 없어요.
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default SavedPage;
