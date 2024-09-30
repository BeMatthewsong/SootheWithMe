import { useEffect, useState } from 'react';
import { formatCalendarDate } from '@/utils/formatDate';
import { ReviewScoreType, ReviewsType } from '@/types/data.type';
import { GatheringChipsType, GatheringTabsType } from '@/types/client.type';
import getReviewList from '@/app/api/actions/reviews/getReviewList';
import getReviewScore from '@/app/api/actions/reviews/getReviewScore';
import { LIMIT_PER_REQUEST } from '@/constants/common';

// sorting 시 한글 옵션을 영어로 변환해주는 기능
export const sortOptionsMap: { [key: string]: string } = {
  최신순: 'createdAt',
  '평점 높은 순': 'score',
  '참여 인원 순': 'participantCount',
};

interface GetReviewListParams {
  type?: 'DALLAEMFIT' | 'OFFICE_STRETCHING' | 'MINDFULNESS' | 'WORKATION';
  limit?: number;
  offset?: number;
  location?: string; // 건대입구, 을지로3가, 신림, 홍대입구
  date?: string; // (YYYY-MM-DD 형식)
  sortBy?: string; //createdAt, score, participantCount
  sortOrder?: 'asc' | 'desc';
  gatheringId?: number;
}

interface FilteringOptionsType {
  location: string | undefined;
  date: Date | null;
  sortOption: string | undefined;
}

const useReviews = (
  initialReviewsData: ReviewsType[],
  reviewScoreData: ReviewScoreType[],
) => {
  const [filteredData, setFilteredData] =
    useState<ReviewsType[]>(initialReviewsData);

  const [filteredSortData, setFilteredSortData] =
    useState<ReviewScoreType[]>(reviewScoreData);

  const [activeTab, setActiveTab] = useState<GatheringTabsType>('DALLAEMFIT');

  const [selectedChip, setSelectedChip] = useState<GatheringChipsType>('ALL');

  const fetchReviewsAndScores = async (
    type: GetReviewListParams['type'] | undefined,
  ) => {
    const [newData, newScore] = await Promise.all([
      getReviewList({ type: type }),
      getReviewScore({ type: type }),
    ]);

    setFilteredData(newData);
    setFilteredSortData(newScore);
  };

  // 모임 종류 탭 클릭 이벤트 핸들러
  const handleTabClick = async (type: GatheringTabsType) => {
    setActiveTab(type);
    setSelectedChip('ALL'); // 탭 변경 시 하위 종류 탭 초기화

    fetchReviewsAndScores(type);
  };

  // 달램핏 세부 종류 탭 클릭 이벤트 핸들러
  const handleChipClick = async (label: GatheringChipsType) => {
    setSelectedChip(label);

    const type = label === 'ALL' ? activeTab : label;

    fetchReviewsAndScores(type);
  };

  const initialFilteringOptions: FilteringOptionsType = {
    location: undefined,
    date: null,
    sortOption: undefined,
  };

  const [filteringOptions, setFilteringOptions] =
    useState<FilteringOptionsType>(initialFilteringOptions);

  // 필터 옵션을 업데이트하는 함수들
  const handleLocationChange = (location: string | undefined) => {
    setFilteringOptions((prev) => ({ ...prev, location }));
  };

  const handleDateChange = (date: Date | null) => {
    setFilteringOptions((prev) => ({ ...prev, date }));
  };

  const handleSortChange = (option: string | undefined) => {
    setFilteringOptions((prev) => ({ ...prev, sortOption: option }));
  };

  // 공통된 필터링 로직을 별도 함수로 분리
  const buildParams = (
    type: 'OFFICE_STRETCHING' | 'MINDFULNESS' | GatheringTabsType,
    options: FilteringOptionsType,
  ): GetReviewListParams => {
    const params: GetReviewListParams = { type };

    if (options.location) {
      params.location = options.location;
    }
    if (options.date) {
      params.date = formatCalendarDate(options.date);
    }
    if (options.sortOption) {
      params.sortBy = sortOptionsMap[options.sortOption];
      params.sortOrder = 'desc';
    }

    return params;
  };

  // filteringOptions가 업데이트될 때 필터링 처리
  useEffect(() => {
    const handleFiltering = async () => {
      const type = selectedChip === 'ALL' ? activeTab : selectedChip;
      const params = buildParams(type, filteringOptions);
      const newData = await getReviewList(params);
      setFilteredData(newData);
    };

    handleFiltering();
  }, [filteringOptions]);

  // 무한 스크롤
  const [offset, setOffset] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // 로드 모어
  const loadMore = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    const newOffset = offset + LIMIT_PER_REQUEST;

    const type = selectedChip === 'ALL' ? activeTab : selectedChip;
    const params = buildParams(type, filteringOptions);
    params.offset = newOffset;

    try {
      const moreData = await getReviewList(params);
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
    filteredSortData,
    activeTab,
    selectedChip,
    handleTabClick,
    handleChipClick,
    handleLocationChange,
    handleDateChange,
    handleSortChange,
    loadMore,
    isLoading,
    hasMore,
  };
};

export default useReviews;
