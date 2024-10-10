'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Chips from '@/app/components/Chips/Chips';
import MakeGatheringModal from '@/app/components/Modal/MakeGatheringModal';
import Tabs from '@/app/components/Tabs/Tabs';
import useGatherings from '@/hooks/useGatherings';
import usePreventScroll from '@/hooks/usePreventScroll';
import { GatheringType } from '@/types/data.type';
import CreateGatheringButton from './CreateGatheringButton';
import Filters from '@/app/components/Filters/Filters';
import GatheringCardList from './GatheringCardList';
import Loader from '@/app/components/Loader/Loader';
import Popup from '@/app/components/Popup/Popup';
import { UserData } from '@/types/client.type';

import { useInView } from 'react-intersection-observer';
import { SORT_OPTIONS } from '@/constants/common';

interface ClientSideGatheringsProps {
  gatherings: GatheringType[];
  user: UserData | null;
}

const ClientSideGatherings = ({
  gatherings,
  user,
}: ClientSideGatheringsProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isShowPopup, setIsShowPopup] = useState<boolean>(false);
  const { ref, inView } = useInView({ threshold: 1.0 });
  const router = useRouter();

  const isUserNull = (user: UserData | null) => {
    return user === null;
  };

  const handleModalButtonClick = () => {
    if (!isUserNull(user)) {
      return setIsModalOpen(true);
    }
    setIsShowPopup(true);
  };

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
    selectedChip,
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
            <CreateGatheringButton onClick={handleModalButtonClick} />
          </div>
          <Chips
            activeTab={activeTab}
            onChipClick={handleChipClick}
            activeChip={selectedChip}
          />
        </div>
        <Filters
          onLocationChange={handleLocationChange}
          onDateChange={handleDateChange}
          onSortChange={handleSortChange}
          sortOptions={SORT_OPTIONS}
        />
      </div>
      <GatheringCardList gatherings={filteredData} />

      {isLoading && (
        <div className='flex items-center justify-center pt-24'>
          <Loader />
        </div>
      )}

      {hasMore && <div ref={ref} className='h-24' />}

      {isModalOpen && (
        <MakeGatheringModal onClose={() => setIsModalOpen(false)} />
      )}

      {isShowPopup && ( // 팝업 렌더링
        <Popup
          type='login'
          hasCancelButton={true}
          onClickClose={() => setIsShowPopup(false)}
          onClickConfirm={() => {
            setIsShowPopup(false);
            router.push('/signin');
          }}
        />
      )}
    </>
  );
};

export default ClientSideGatherings;
