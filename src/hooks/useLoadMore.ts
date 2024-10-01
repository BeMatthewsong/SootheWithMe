import { useState } from 'react';

import { LIMIT_PER_REQUEST } from '@/constants/common';
import { GatheringsListData } from '@/types/data.type';

const useLoadMore = (
  fetchFilteredGatherings: (filters: {
    offset: number;
  }) => Promise<GatheringsListData[]>,
  offset: number,
  setOffset: (offset: number) => void,
  setFilteredData: (
    data: (prevData: GatheringsListData[]) => GatheringsListData[],
  ) => void,
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

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

  return { loadMore, isLoading, hasMore, setHasMore };
};

export default useLoadMore;
