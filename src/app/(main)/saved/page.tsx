'use client';

import { useEffect, useState } from 'react';
import Tabs from '@/app/components/Tabs/Tabs';
import Chips from './_component/Chips';
import Header from './_component/Header';
import Filters from '@/app/components/Filters/Filters';
import getGatherings from '@/app/api/actions/gatherings/getGatherings';
import { GatheringsListData } from '@/types/data.type';
import { useSavedGatheringList } from '@/context/SavedGatheringContext';
import { GatheringChipsType, GatheringTabsType } from '@/types/client.type';
import SavedList from './_component/SavedList';

// TODO : 페이지 단의 코드를 계층화 하여 각 컴포넌트를 분리하기 위한 리팩토링
// TODO : 1. 필터링 상태에서 찜한 모임 삭제 시 필터링 상태 유지
// TODO : 2. 날짜 필터링 기능 보완

const sortOptionsMap: Record<string, string> = {
  최신순: 'dateTime',
  '마감 임박': 'registrationEnd',
  '참여 인원 순': 'participantCount',
};

const SavedPage = () => {
  const [initialGatherings, setIinitialGatherings] = useState<
    GatheringsListData[]
  >([]);
  const [filteredData, setFilteredData] =
    useState<GatheringsListData[]>(initialGatherings);

  const { savedGatherings, updateGathering } = useSavedGatheringList();

  const [activeTab, setActiveTab] = useState<GatheringTabsType>('DALLAEMFIT');
  const [activeChip, setActiveChip] = useState<GatheringChipsType>('ALL');

  const handleTabClick = (type: GatheringTabsType) => {
    setActiveTab(type);
    setActiveChip('ALL');
  };

  const handleChipClick = (type: GatheringChipsType) => {
    setActiveChip(type);
  };

  // Active Tab 이 바뀔 때마다, 해당 탭에 맞는 모임 리스트를 가져옴
  useEffect(() => {
    const getSavedGatherings = async () => {
      const idString = savedGatherings.join(',');
      const res = await getGatherings({
        id: idString,
        type: activeTab,
        limit: savedGatherings.length,
      });
      setIinitialGatherings(res);
      setFilteredData(res);
    };

    if (savedGatherings.length > 0) {
      getSavedGatherings();
    }
  }, [savedGatherings, activeTab]);

  const [selectedLocation, setSelectedLocation] = useState<string | undefined>(
    undefined,
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [sortOption, setSortOption] = useState<string | undefined>();

  const handleLocationChange = (location: string | undefined) => {
    setSelectedLocation(location);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleSortChange = (option: string | undefined) => {
    setSortOption(option);
  };

  useEffect(() => {
    let filtered = initialGatherings;

    if (activeChip !== 'ALL') {
      filtered = initialGatherings.filter((item) => item.type === activeChip);
    }

    if (selectedLocation) {
      filtered = filtered.filter((item) => item.location === selectedLocation);
    }

    if (selectedDate) {
      filtered = filtered.filter(
        (item) => item.dateTime === selectedDate.toISOString(),
      );
    }

    if (sortOption) {
      const sortField = sortOptionsMap[sortOption]; // sortOption에 맞는 필드를 매핑

      if (sortField === 'dateTime') {
        // 최신순: dateTime을 기준으로 최신 날짜가 앞에 오도록 정렬
        filtered = [...filtered].sort(
          (a, b) =>
            new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime(),
        );
      } else if (sortField === 'registrationEnd') {
        // 마감 임박: registrationEnd 문자열을 Date 객체로 변환하여 가까운 마감일이 앞에 오도록 정렬
        filtered = [...filtered].sort(
          (a, b) =>
            new Date(a.registrationEnd).getTime() -
            new Date(b.registrationEnd).getTime(),
        );
      } else if (sortField === 'participantCount') {
        // 참여 인원 순: participantCount가 많은 순으로 정렬
        filtered = [...filtered].sort(
          (a, b) => b.participantCount - a.participantCount,
        );
      }
    }
    setFilteredData(filtered);
  }, [activeChip, selectedLocation, selectedDate, sortOption]);

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
          {filteredData.length > 0 ? (
            <SavedList dataList={filteredData} />
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
