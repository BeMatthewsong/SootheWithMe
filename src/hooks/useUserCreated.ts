import { useState } from 'react';
import getGatherings from '@/app/api/actions/gatherings/getGatherings';
import { GatheringsListData } from '@/types/data.type';
import { LIMIT_PER_REQUEST, SORT_OPTIONS_MAP } from '@/constants/common';

export const useUserCreated = (
  initialGatheringList: GatheringsListData[],
  createdBy: string,
) => {
  const [gatheringsList, setGatheringsList] =
    useState<GatheringsListData[]>(initialGatheringList);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState<boolean>(
    initialGatheringList.length >= LIMIT_PER_REQUEST,
  );
  const [offset, setOffset] = useState(0);

  const loadMore = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    const newOffset = offset + LIMIT_PER_REQUEST;

    try {
      const gatherings = await getGatherings({
        createdBy: createdBy,
        offset: newOffset,
        limit: LIMIT_PER_REQUEST,
        sortBy: SORT_OPTIONS_MAP['최신순'],
        sortOrder: 'desc',
      });

      if (gatherings.length < LIMIT_PER_REQUEST) {
        setHasMore(false);
      }

      setGatheringsList((prevData) => [...prevData, ...gatherings]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
      setOffset(offset + LIMIT_PER_REQUEST);
    }
  };

  return { gatheringsList, isLoading, hasMore, loadMore };
};

export default useUserCreated;
