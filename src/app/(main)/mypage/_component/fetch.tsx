import { FetchGatheringsResponse } from '@/types/data.type';

const fetchGatherings = async (
  offset = 0,
  limit = 5,
): Promise<FetchGatheringsResponse> => {
  const response = await fetch(`/api/mock?offset=${offset}&limit=${limit}`);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export default fetchGatherings;
