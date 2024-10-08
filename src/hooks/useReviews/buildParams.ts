import { REVIEW_SORT_OPTIONS_MAP } from '@/constants/common';
import { GatheringsType } from '@/types/client.type';
import { GetReviewsParams } from '@/types/data.type';
import { formatCalendarDate } from '@/utils/formatDate';

interface FilteringOptionsType {
  location: string | undefined;
  date: Date | null;
  sortOption: string | undefined;
}

const buildParams = (
  type: GatheringsType,
  options?: FilteringOptionsType,
): GetReviewsParams => {
  const params: GetReviewsParams = { type };

  if (!options) {
    return params;
  }

  return {
    ...params,
    ...(options.location && { location: options.location }),
    ...(options.date && { date: formatCalendarDate(options.date) }),
    ...(options.sortOption && {
      sortBy: REVIEW_SORT_OPTIONS_MAP[options.sortOption],
      sortOrder: 'desc',
    }),
  };
};

export default buildParams;
