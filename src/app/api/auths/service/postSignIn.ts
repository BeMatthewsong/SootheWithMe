'use client';

import { SignInData } from '@/types/client.type';

export const submitSignInData = async (data: SignInData) => {
  const response = await fetch('api/auths/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const result = await response.json();
    return result;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message); // 오류 메시지 반환
  }
};
