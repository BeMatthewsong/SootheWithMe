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
import { LIMIT_PER_REQUEST } from '@/constants/common';

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
  const [offset, setOffset] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchFilteredGatherings = async (
    overrides: Partial<{
      type: 'WORKATION' | 'DALLAEMFIT' | 'OFFICE_STRETCHING' | 'MINDFULNESS';
      location: string | undefined;
      date: Date | null;
      sortBy: string | undefined;
      sortOrder: 'asc' | 'desc';
      offset: number;
    }> = {},
  ) => {
    const type =
      overrides.type ||
      (selectedChip === 'ALL' || !selectedChip ? activeTab : selectedChip);
    const date = overrides.date
      ? formatCalendarDate(overrides.date)
      : selectedDate
        ? formatCalendarDate(selectedDate)
        : undefined;
    const sortBy = overrides.sortBy || sortOption;
    const sortOrder = sortBy === 'participantCount' ? 'desc' : undefined;

    const newData = await getGatherings({
      type,
      location: overrides.location || selectedLocation,
      date,
      sortBy,
      offset: overrides.offset || 0,
      limit: LIMIT_PER_REQUEST,
      ...(sortOrder && { sortOrder }),
    });

    return newData || [];
  };

  const resetFiltersAndFetchData = async (
    filters: Partial<{
      type: 'WORKATION' | 'DALLAEMFIT' | 'OFFICE_STRETCHING' | 'MINDFULNESS';
      location: string | undefined;
      date: Date | null;
      sortBy: string | undefined;
    }>,
  ) => {
    setOffset(0);
    setHasMore(true);

    const newData = await fetchFilteredGatherings({ ...filters, offset: 0 });
    setFilteredData(newData);
  };

  const handleTabClick = (type: 'WORKATION' | 'DALLAEMFIT') => {
    setActiveTab(type);
    setSelectedChip(null);
    resetFiltersAndFetchData({ type });
  };

  const handleChipClick = (
    label: 'ALL' | 'OFFICE_STRETCHING' | 'MINDFULNESS',
  ) => {
    setSelectedChip(label);
    const type = label === 'ALL' ? 'DALLAEMFIT' : label;
    resetFiltersAndFetchData({ type });
  };

  const handleLocationChange = (location: string | undefined) => {
    setSelectedLocation(location);
    resetFiltersAndFetchData({ location });
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    resetFiltersAndFetchData({ date });
  };

  const handleSortChange = (option: string | undefined) => {
    const sortBy: string | undefined = option
      ? sortOptionsMap[option]
      : undefined;
    setSortOption(sortBy);
    resetFiltersAndFetchData({ sortBy });
  };

  const loadMore = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    const newOffset = offset + LIMIT_PER_REQUEST;

    try {
      const moreData = await fetchFilteredGatherings({ offset: newOffset });

      if (moreData.length < LIMIT_PER_REQUEST) {
        setHasMore(false);
      }

      setFilteredData((prevData) => [...prevData, ...moreData]);
      setOffset(newOffset);
    } catch (error) {
      console.error('데이터를 불러오는 데 에러가 발생했습니다.', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    filteredData,
    activeTab,
    selectedChip,
    selectedLocation,
    selectedDate,
    sortOption,
    isLoading,
    hasMore,
    handleTabClick,
    handleChipClick,
    handleLocationChange,
    handleDateChange,
    handleSortChange,
    loadMore,
  };
};

export default useGatherings;
