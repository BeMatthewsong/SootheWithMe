import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { postUserLogoutData } from '@/app/api/actions/mypage/postUserLogoutData';
import toast from 'react-hot-toast';
import { deleteCookie } from '@/app/api/actions/cookie/cookie';

export const TokenExpirationTimer = (token: string | undefined) => {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // JWT 디코드하여 만료 시간을 가져오는 함수
  const getTokenExpirationTime = (token: string) => {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000; // 만료 시간을 밀리초로 변환
  };

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      const expirationTime = getTokenExpirationTime(token); // 만료시간
      const currentTime = Date.now(); // 현재시간
      const remainingTime = Math.max(0, expirationTime - currentTime); // 남은 시간 계산
      setTimeLeft(Math.floor(remainingTime / 1000)); // 초 단위로 변환

      // 타이머 설정
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            logout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  // 로그아웃 로직
  const logout = async () => {
    const result = await postUserLogoutData();
    if (result) {
      toast.success('로그아웃이 완료되었습니다.');
      deleteCookie('token');
      router.push('/gatherings');
    } else {
      toast.error('로그아웃에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return { timeLeft, isLoggedIn };
};
