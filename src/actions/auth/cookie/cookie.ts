'use server';

import { cookies } from 'next/headers';

// 쿠키를 받아오는 함수
export const getCookie = async (key: string) => {
  const cookie = cookies().get(key);
  return cookie?.value;
};

// 쿠키를 저장하는 함수
export const setCookie = async (key: string, value: string) => {
  const expirationDate = new Date(Date.now() + 3600 * 1000);
  cookies().set(key, value, { expires: expirationDate });
};

// 쿠키를 삭제하는 함수
export const deleteCookie = (key: string) => {
  cookies().delete(key);
};
