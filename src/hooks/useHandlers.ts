import { useCallback } from 'react';

import {
  GatheringChipsType,
  GatheringFilters,
  GatheringTabsType,
} from '@/types/client.type';
import { SORT_OPTIONS_MAP } from '@/constants/common';

const useHandlers = (
  setActiveTab: (tab: GatheringTabsType) => void,
  setSelectedChip: (chip: GatheringChipsType) => void,
  setSelectedLocation: (location: string | undefined) => void,
  setSelectedDate: (date: Date | null) => void,
  setSortOption: (sortBy: string | undefined) => void,
  resetFilters: (filters: GatheringFilters) => void,
  updateFilteredData: (filters: GatheringFilters) => void,
) => {
  const handleTabClick = useCallback(
    (type: GatheringTabsType) => {
      setActiveTab(type);
      setSelectedChip('ALL');
      resetFilters({ type });
      updateFilteredData({ type });
    },
    [setActiveTab, setSelectedChip, resetFilters, updateFilteredData],
  );

  const handleChipClick = useCallback(
    (label: GatheringChipsType) => {
      setSelectedChip(label);
      const type = label === 'ALL' ? 'DALLAEMFIT' : label;
      resetFilters({ type });
      updateFilteredData({ type });
    },
    [setSelectedChip, resetFilters, updateFilteredData],
  );

  const handleLocationChange = useCallback(
    (location: string | undefined) => {
      setSelectedLocation(location);
      resetFilters({ location });
      updateFilteredData({ location });
    },
    [setSelectedLocation, resetFilters, updateFilteredData],
  );

  const handleDateChange = useCallback(
    (date: Date | null) => {
      setSelectedDate(date);
      resetFilters({ date });
      updateFilteredData({ date });
    },
    [setSelectedDate, resetFilters, updateFilteredData],
  );

  const handleSortChange = useCallback(
    (option: string | undefined) => {
      const sortBy = option ? SORT_OPTIONS_MAP[option] : undefined;
      setSortOption(sortBy);
      resetFilters({ sortBy });
      updateFilteredData({ sortBy });
    },
    [setSortOption, resetFilters, updateFilteredData],
  );

  return {
    handleTabClick,
    handleChipClick,
    handleLocationChange,
    handleDateChange,
    handleSortChange,
  };
};

export default useHandlers;
