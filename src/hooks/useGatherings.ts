/**
 * 사용자가 선택한 필터에 따라 모임 데이터를 필터링하는 커스텀 훅입니다.
 * 이 훅은 초기 모임 데이터를 상태로 관리하며, 다양한 필터와 정렬 옵션을 설정할 수 있는 핸들러 함수를 제공합니다.
 * 또한, 필터 변경 시 쿼리 파라미터를 업데이트하고, 필터링된 데이터를 서버에서 가져오는 기능을 포함합니다.
 *
 * @param {GatheringsListData[]} initialGatherings - 초기 모임 데이터 배열
 */

import { useEffect, useState } from 'react';

import useUpdateQueryParams from './useUpdateQueryParams';
import useFetchFilteredGatherings from './useFetchFilteredGatherings';
import useLoadMore from './useLoadMore';
import useHandlers from './useHandlers';
import { formatCalendarDate } from '@/utils/formatDate';
import {
  GatheringChipsType,
  GatheringFilters,
  GatheringTabsType,
} from '@/types/client.type';
import { GatheringsListData } from '@/types/data.type';

const useGatherings = (initialGatherings: GatheringsListData[]) => {
  const [filteredData, setFilteredData] =
    useState<GatheringsListData[]>(initialGatherings);

  const [activeTab, setActiveTab] = useState<GatheringTabsType>('DALLAEMFIT');
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>(
    undefined,
  );
  const [selectedChip, setSelectedChip] = useState<GatheringChipsType | null>(
    null,
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [sortOption, setSortOption] = useState<string | undefined>('dateTime');
  const [offset, setOffset] = useState<number>(0);

  // 필터링된 모임 데이터를 가져오는 훅
  const { fetchFilteredGatherings } = useFetchFilteredGatherings(
    selectedChip,
    activeTab,
    selectedDate,
    selectedLocation,
    sortOption,
  );

  // 더 많은 데이터를 불러오는 훅
  const { loadMore, isLoading, hasMore, setHasMore } = useLoadMore(
    fetchFilteredGatherings,
    offset,
    setOffset,
    setFilteredData,
  );

  // 필터링된 데이터를 state 를 이용해 업데이트하는 함수
  const updateFilteredData = async (filters: GatheringFilters) => {
    const newData = await fetchFilteredGatherings({ ...filters, offset: 0 });
    setFilteredData(newData);
  };

  // 쿼리 파라미터를 업데이트하는 훅
  const updateQueryParams = useUpdateQueryParams();

  // 필터를 초기화하고 쿼리 파라미터를 업데이트하는 함수
  const resetFilters = (filters: GatheringFilters) => {
    setOffset(0);
    setHasMore(true);

    updateQueryParams({
      type: filters.type,
      location: filters.location,
      date: filters.date ? formatCalendarDate(filters.date) : undefined,
      sortBy: filters.sortBy,
    });
  };

  // 핸들러 함수들을 관리하는 훅
  const {
    handleTabClick,
    handleChipClick,
    handleLocationChange,
    handleDateChange,
    handleSortChange,
  } = useHandlers(
    setActiveTab,
    setSelectedChip,
    setSelectedLocation,
    setSelectedDate,
    setSortOption,
    resetFilters,
    updateFilteredData,
  );

  // 활성화된 탭이나 필터가 변경될 때 데이터 업데이트
  useEffect(() => {
    resetFilters({
      type: activeTab,
      location: selectedLocation,
      date: selectedDate,
      sortBy: sortOption,
    });
    updateFilteredData({
      type: activeTab,
      location: selectedLocation,
      date: selectedDate,
      sortBy: sortOption,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, selectedLocation, selectedDate, sortOption]);

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
