'use client';

import Tabs from '@/app/components/Tabs/Tabs';
import Chips from './_component/Chips';
import Header from './_component/Header';
import Filters from '@/app/components/Filters/Filters';
import { useSavedGatheringList } from '@/context/SavedGatheringContext';
import SavedList from './_component/SavedList';
import useSavedGatherings from '@/hooks/useSavedGatherings';

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
    <main className='mx-auto flex h-full max-w-1200 flex-col bg-var-gray-50 px-16 pb-48 pt-24 md:px-24 md:pt-40 lg:px-100'>
      <Header />

      <section className='mt-24 flex grow flex-col md:mt-32'>
        <Tabs activeTab={activeTab} onTabClick={handleTabClick} />

        <div className='flex flex-col gap-16 divide-y'>
          <Chips
            activeTab={activeTab}
            selectedChip={activeChip}
            onChipClick={handleChipClick}
          />

          <Filters
            onLocationChange={handleLocationChange}
            onDateChange={handleDateChange}
            onSortChange={handleSortChange}
          />
        </div>

        {/* data list */}
        <div className='mt-24 flex grow flex-col gap-24'>
          {gatheringListData.length > 0 ? (
            <SavedList dataList={gatheringListData} />
          ) : (
            <div className='flex size-full grow items-center justify-center text-14 font-medium text-var-gray-500'>
              아직 아직 찜한 모임이 없어요.
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default SavedPage;
