import getGatherings from '@/app/api/actions/gatherings/getGatherings';
import { SORT_OPTIONS_MAP } from '@/constants/common';
import { GatheringChipsType, GatheringTabsType } from '@/types/client.type';
import { GatheringsListData, GetGatheringsParams } from '@/types/data.type';
import { formatCalendarDate } from '@/utils/formatDate';
import { useEffect, useState } from 'react';

const useSavedGatherings = (savedGatherings: number[]) => {
  const [gatheringListData, setGatheringListData] = useState<
    GatheringsListData[]
  >([]);

  const [activeTab, setActiveTab] = useState<GatheringTabsType>('DALLAEMFIT');
  const [activeChip, setActiveChip] = useState<GatheringChipsType>('ALL');
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>(
    undefined,
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [sortOption, setSortOption] = useState<string | undefined>();

  const handleTabClick = (type: GatheringTabsType) => {
    setActiveTab(type);
    setActiveChip('ALL');
  };

  const handleChipClick = (type: GatheringChipsType) => {
    setActiveChip(type);
  };

  const handleLocationChange = (location: string | undefined) => {
    setSelectedLocation(location);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleSortChange = (option: string | undefined) => {
    setSortOption(option);
  };

  // 조건이 바뀔 때마다, 해당 조건에 맞는 모임 리스트를 가져옴
  useEffect(() => {
    if (savedGatherings.length > 0) {
      const params: GetGatheringsParams = {
        id: savedGatherings.join(','),
        type: activeChip === 'ALL' ? activeTab : activeChip,
        limit: savedGatherings.length,
        location: selectedLocation ? selectedLocation : undefined,
        date: selectedDate ? formatCalendarDate(selectedDate) : undefined,
        sortBy: sortOption ? SORT_OPTIONS_MAP[sortOption] : undefined,
        sortOrder: sortOption ? 'desc' : undefined,
      };

      getSavedGatherings(params);
    } else {
      setGatheringListData([]);
    }
  }, [
    savedGatherings,
    activeTab,
    activeChip,
    selectedLocation,
    selectedDate,
    sortOption,
  ]);

  const getSavedGatherings = async (params: GetGatheringsParams) => {
    const res = await getGatherings(params);
    setGatheringListData(res);
  };

  return {
    gatheringListData,
    activeTab,
    activeChip,
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

export default useSavedGatherings;
