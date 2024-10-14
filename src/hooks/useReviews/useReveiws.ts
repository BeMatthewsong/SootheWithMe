import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import getReviewList from '@/app/api/actions/reviews/getReviewList';
import getReviewScore from '@/app/api/actions/reviews/getReviewScore';
import useFilterState from './useFilterState';
import buildParams from './buildParams';
import { ReviewScoreType, ReviewsType } from '@/types/data.type';
import {
  DEFAULT_GATHERINGS_OFFSET,
  LIMIT_PER_REQUEST,
} from '@/constants/common';

const useReviews = (
  initialReviewsData: ReviewsType[],
  reviewScoreData: ReviewScoreType[],
) => {
  const {
    activeTab,
    selectedChip,
    filteringOptions,
    handleTabClick,
    handleChipClick,
    handleLocationChange,
    handleDateChange,
    handleSortChange,
  } = useFilterState();

  const getParams = () => {
    const type = selectedChip === 'ALL' ? activeTab : selectedChip;
    return buildParams(type, filteringOptions);
  };

  const {
    data: score,
    isError: isScoreError,
    error: scoreError,
  } = useQuery({
    queryKey: ['score', activeTab, selectedChip],
    queryFn: async () => {
      try {
        const type = selectedChip === 'ALL' ? activeTab : selectedChip;
        const response = await getReviewScore({ type: type });
        return response;
      } catch (error) {
        throw error instanceof Error
          ? new Error(error.message)
          : new Error('리뷰 평점을 불러오는 중 오류가 발생했습니다.');
      }
    },
    initialData: reviewScoreData,
  });

  // 무한스크롤
  const {
    data,
    fetchNextPage, // loadMore
    hasNextPage, // hasMore
    isFetchingNextPage, // isLoading
    isError: isReviewsError,
    error: reviewsError,
  } = useInfiniteQuery({
    queryKey: ['reviews', filteringOptions, activeTab, selectedChip],
    queryFn: async ({ pageParam = DEFAULT_GATHERINGS_OFFSET }) => {
      try {
        const params = getParams();
        const response = await getReviewList({
          limit: LIMIT_PER_REQUEST,
          offset: pageParam,
          ...params,
        });

        return response;
      } catch (error) {
        throw error instanceof Error
          ? new Error(error.message)
          : new Error('리뷰를 불러오는 중 오류가 발생했습니다.');
      }
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage && lastPage.length === LIMIT_PER_REQUEST
        ? allPages.length * LIMIT_PER_REQUEST
        : undefined;
    },
    initialPageParam: DEFAULT_GATHERINGS_OFFSET,
    initialData: {
      pages: [initialReviewsData],
      pageParams: [DEFAULT_GATHERINGS_OFFSET],
    },
  });

  return {
    filteredData: data.pages,
    score,
    activeTab,
    selectedChip,
    handleTabClick,
    handleChipClick,
    handleLocationChange,
    handleDateChange,
    handleSortChange,
    loadMore: fetchNextPage,
    isLoading: isFetchingNextPage,
    hasMore: hasNextPage,
    isError: isScoreError || isReviewsError,
    error: scoreError || reviewsError,
  };
};

export default useReviews;
