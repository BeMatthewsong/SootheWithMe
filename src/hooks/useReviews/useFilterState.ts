import { GatheringChipsType, GatheringTabsType } from '@/types/client.type';
import { useState } from 'react';

interface FilteringOptionsType {
  location: string | undefined;
  date: Date | null;
  sortOption: string | undefined;
}

const useFilterState = () => {
  const [activeTab, setActiveTab] = useState<GatheringTabsType>('DALLAEMFIT');

  const [selectedChip, setSelectedChip] = useState<GatheringChipsType>('ALL');

  const initialFilteringOptions: FilteringOptionsType = {
    location: undefined,
    date: null,
    sortOption: undefined,
  };

  const [filteringOptions, setFilteringOptions] =
    useState<FilteringOptionsType>(initialFilteringOptions);

  const handleTabClick = async (type: GatheringTabsType) => {
    setActiveTab(type);
    setSelectedChip('ALL'); // 탭 변경 시 하위 종류 탭 초기화
  };

  const handleChipClick = async (label: GatheringChipsType) => {
    setSelectedChip(label);
  };

  const handleLocationChange = (location: string | undefined) => {
    setFilteringOptions((prev) => ({ ...prev, location }));
  };

  const handleDateChange = (date: Date | null) => {
    setFilteringOptions((prev) => ({ ...prev, date }));
  };

  const handleSortChange = (option: string | undefined) => {
    setFilteringOptions((prev) => ({ ...prev, sortOption: option }));
  };

  return {
    activeTab,
    selectedChip,
    filteringOptions,
    handleTabClick,
    handleChipClick,
    handleLocationChange,
    handleDateChange,
    handleSortChange,
  };
};

export default useFilterState;
