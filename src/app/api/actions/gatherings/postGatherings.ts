'use server';

import { getCookie } from '../cookie/cookie';

const postGatherings = async (formData: FormData) => {
  try {
    const token = await getCookie('token');

    if (!token) {
      return { success: false, message: '로그인이 필요합니다.' };
    }

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

    const data = await res.json();

    return { success: true, data, message: '모임이 생성되었습니다.' };
  } catch (error) {
    return {
      success: false,
      message: '모임 생성이 실패하였습니다.',
    };
  }
};

export default postGatherings;
