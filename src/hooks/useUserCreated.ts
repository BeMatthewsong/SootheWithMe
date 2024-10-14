import { useInfiniteQuery } from '@tanstack/react-query';
import getGatherings from '@/app/api/actions/gatherings/getGatherings';
import { GatheringType } from '@/types/data.type';
import {
  DEFAULT_GATHERINGS_OFFSET,
  LIMIT_PER_REQUEST,
  SORT_OPTIONS_MAP,
} from '@/constants/common';

export const useUserCreated = (
  initialGatheringList: GatheringType[],
  createdBy: string,
) => {
  const {
    data,
    fetchNextPage, // loadMore
    hasNextPage, // hasMore
    isFetchingNextPage, // isLoading
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['created', createdBy],
    queryFn: async ({ pageParam = DEFAULT_GATHERINGS_OFFSET }) => {
      try {
        const response = await getGatherings({
          createdBy: createdBy,
          limit: LIMIT_PER_REQUEST,
          offset: pageParam,
          sortBy: SORT_OPTIONS_MAP['최신순'],
          sortOrder: 'desc',
        });

        return response;
      } catch (error) {
        throw error instanceof Error
          ? new Error(error.message)
          : new Error('모임 목록을 불러오는 중 오류가 발생했습니다.');
      }
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage && lastPage.length === LIMIT_PER_REQUEST
        ? allPages.length * LIMIT_PER_REQUEST
        : undefined;
    },
    initialPageParam: DEFAULT_GATHERINGS_OFFSET,
    initialData: {
      pages: [initialGatheringList],
      pageParams: [DEFAULT_GATHERINGS_OFFSET],
    },
  });

  return {
    gatheringsList: data,
    loadMore: fetchNextPage,
    hasMore: hasNextPage,
    isLoading: isFetchingNextPage,
    isError,
    error,
  };
};

export default useUserCreated;
