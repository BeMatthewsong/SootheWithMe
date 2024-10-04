import { getCookie } from '@/actions/auth/cookie/cookie';

interface PostGatheringsParams {
  location: string;
  type: string;
  dateTime: string;
  capacity: number;
  image: File;
  registrationEnd?: string;
}

const postGatherings = async (params: PostGatheringsParams) => {
  const { location, type, dateTime, capacity, image } = params;
  try {
    const token = await getCookie('token');

    if (!token) {
      return { success: false, message: '로그인이 필요합니다.' };
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

    const { data } = await res.json();
    return { success: true, data, message: '모임이 생성되었습니다.' };
  } catch (error) {
    return {
      success: false,
      message: '모임 생성이 실패하였습니다.',
    };
  }
};

export default postGatherings;
