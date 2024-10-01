import getGatherings from '@/app/api/actions/gatherings/getGatherings';
import { formatCalendarDate } from '@/utils/formatDate';
import {
  GatheringChipsType,
  GatheringFilters,
  GatheringTabsType,
} from '@/types/client.type';
import { LIMIT_PER_REQUEST } from '@/constants/common';

const useFetchFilteredGatherings = (
  selectedChip: GatheringChipsType | null,
  activeTab: GatheringTabsType,
  selectedDate: Date | null,
  selectedLocation: string | undefined,
  sortOption: string | undefined,
) => {
  const fetchFilteredGatherings = async (overrides: GatheringFilters = {}) => {
    const type =
      overrides.type ||
      (selectedChip === 'ALL' || !selectedChip ? activeTab : selectedChip);
    const date = overrides.date
      ? formatCalendarDate(overrides.date)
      : selectedDate
        ? formatCalendarDate(selectedDate)
        : undefined;
    const sortBy = overrides.sortBy || sortOption;
    const sortOrder = sortBy ? 'desc' : undefined;

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

  return { fetchFilteredGatherings };
};

export default useFetchFilteredGatherings;
