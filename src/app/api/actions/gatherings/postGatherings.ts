'use server';

import { GatheringInfoType } from '@/types/data.type';
import { getCookie } from '@/actions/auth/cookie/cookie';

interface PostGatheringsParams {
  location: string;
  type: string;
  dateTime: string;
  capacity: number;
  image: string;
  registrationEnd?: string;
}

const postGatherings = async (
  params: PostGatheringsParams,
): Promise<GatheringInfoType> => {
  const { location, type, dateTime, capacity, image } = params;
  try {
    const token = await getCookie('token');

    if (!token) {
      throw new Error('토큰이 없습니다.');
    }

    const formData = new FormData();
    formData.append('location', location);
    formData.append('type', type);
    formData.append('dateTime', dateTime);
    formData.append('capacity', capacity.toString());
    formData.append('image', image);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/gatherings`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );

    const data: GatheringInfoType = await res.json();

    return data;
  } catch (error) {
    throw new Error('모임 생성이 실패하였습니다.');
  }
};

export default postGatherings;
