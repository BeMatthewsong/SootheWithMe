import { FetchGatheringsResponse } from '@/types/data.type';

const fetchGatherings = async (
  page: number,
): Promise<FetchGatheringsResponse> => {
  const response = await fetch(`/api/mock?page=${page}`);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export default fetchGatherings;
