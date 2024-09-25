/**
 * useGatherings Hook
 *
 * 이 훅은 모임(gatherings) 데이터를 가져오고 필터링하는 로직과 상태 관리를 담당합니다.
 * 위치, 날짜, 탭(모임 종류), 정렬 옵션과 같은 다양한 필터를 기반으로 데이터를 가져오고 업데이트합니다.
 *
 * 제공하는 함수:
 * - handleTabClick: 탭(모임 종류)을 변경하고 해당 탭에 맞는 모임 데이터를 가져옵니다.
 * - handleChipClick: 칩(세부 필터) 선택을 변경하고 해당 필터에 맞는 모임 데이터를 가져옵니다.
 * - handleLocationChange: 위치 선택을 변경하고 선택된 위치에 맞는 모임 데이터를 가져옵니다.
 * - handleDateChange: 날짜 선택을 변경하고 선택된 날짜에 맞는 모임 데이터를 가져옵니다.
 * - handleSortChange: 정렬 옵션을 변경하고 해당 옵션에 맞게 모임 데이터를 정렬합니다.
 *
 * 이 훅은 필터 및 탭이 변경될 때마다 `getGatherings` API를 호출하여 필터링된 모임 데이터를 업데이트합니다.
 */

import { useState } from 'react';

import getGatherings from '@/app/api/actions/gatherings/getGatherings';
import { formatCalendarDate } from '@/utils/formatDate';
import { GatheringsListData } from '@/types/data.type';

// sorting 시 한글 옵션을 영어로 변환해주는 기능
export const sortOptionsMap: { [key: string]: string } = {
  최신순: 'dateTime',
  '마감 임박': 'registrationEnd',
  '참여 인원 순': 'participantCount',
};

const useGatherings = (initialGatherings: GatheringsListData[]) => {
  const [activeTab, setActiveTab] = useState<'WORKATION' | 'DALLAEMFIT'>(
    'DALLAEMFIT',
  );
  const [filteredData, setFilteredData] =
    useState<GatheringsListData[]>(initialGatherings);
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>(
    undefined,
  );
  const [selectedChip, setSelectedChip] = useState<
    'ALL' | 'OFFICE_STRETCHING' | 'MINDFULNESS' | null
  >(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [sortOption, setSortOption] = useState<string | undefined>();

  const handleTabClick = async (type: 'WORKATION' | 'DALLAEMFIT') => {
    setActiveTab(type);
    setSelectedChip(null);

    const newData = await getGatherings({
      type,
      location: selectedLocation,
      date: selectedDate ? formatCalendarDate(selectedDate) : undefined,
      sortBy: sortOption,
    });

    setFilteredData(newData);
  };

  const handleChipClick = async (
    label: 'ALL' | 'OFFICE_STRETCHING' | 'MINDFULNESS',
  ) => {
    setSelectedChip(label);

    const type = label === 'ALL' ? 'DALLAEMFIT' : label;

    const newData = await getGatherings({
      type,
      location: selectedLocation,
      date: selectedDate ? formatCalendarDate(selectedDate) : undefined,
      sortBy: sortOption,
    });

    setFilteredData(newData || []);
  };

  const handleLocationChange = async (location: string | undefined) => {
    setSelectedLocation(location);

    const type =
      selectedChip === 'ALL' || !selectedChip ? activeTab : selectedChip;
    const newData = await getGatherings({
      type,
      location,
      date: selectedDate ? formatCalendarDate(selectedDate) : undefined,
      sortBy: sortOption,
    });

    setFilteredData(newData || []);
  };

  const handleDateChange = async (date: Date | null) => {
    setSelectedDate(date);

    const type =
      selectedChip === 'ALL' || !selectedChip ? activeTab : selectedChip;
    const newData = await getGatherings({
      type,
      location: selectedLocation,
      date: date ? formatCalendarDate(date) : undefined,
      sortBy: sortOption,
    });

    setFilteredData(newData || []);
  };

  const handleSortChange = async (option: string | undefined) => {
    const sortBy: string | undefined = option
      ? sortOptionsMap[option]
      : undefined;
    setSortOption(sortBy);

    const sortOrder = sortBy === 'participantCount' ? 'desc' : undefined;

    const type =
      selectedChip === 'ALL' || !selectedChip ? activeTab : selectedChip;
    const newData = await getGatherings({
      type,
      location: selectedLocation,
      date: selectedDate ? formatCalendarDate(selectedDate) : undefined,
      sortBy,
      ...(sortOrder && { sortOrder }), // sortOrder가 있을 때만 추가
    });

    setFilteredData(newData || []);
  };

  return {
    filteredData,
    activeTab,
    selectedChip,
    selectedLocation,
    selectedDate,
    sortOption,
    handleTabClick,
    handleChipClick,
    handleLocationChange,
    handleDateChange,
    handleSortChange,
  };
};

export default useGatherings;
