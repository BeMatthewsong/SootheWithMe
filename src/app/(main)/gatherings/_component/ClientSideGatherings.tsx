'use client';

import { useEffect, useState } from 'react';

import Chips from '@/app/components/Chips/Chips';
import MakeGatheringModal from '@/app/components/Modal/MakeGatheringModal';
import Tabs from '@/app/components/Tabs/Tabs';
import useGatherings from '@/hooks/useGatherings';
import usePreventScroll from '@/hooks/usePreventScroll';
import { GatheringsListData } from '@/types/data.type';
import CreateGatheringButton from './CreateGatheringButton';
import Filters from './Filters';
import GatheringCardList from './GatheringCardList';

import Popup from '@/app/components/Popup/Popup';
import { UserData } from '@/types/client.type';
import { useRouter } from 'next/navigation';
import { useInView } from 'react-intersection-observer';

interface ClientSideGatheringsProps {
  gatherings: GatheringsListData[];
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
