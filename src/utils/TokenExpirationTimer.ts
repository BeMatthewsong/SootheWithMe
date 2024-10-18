import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { postUserLogoutData } from '@/app/api/actions/mypage/postUserLogoutData';
import toast from 'react-hot-toast';
import { deleteCookie } from '@/app/api/actions/cookie/cookie';

export const TokenExpirationTimer = (token: string | undefined) => {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState<number>(0); // 재렌더링을 위한 스테이트 저장

  // JWT 디코드하여 만료 시간을 가져오는 함수
  const getTokenExpirationTime = (token: string) => {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000; // 만료 시간을 밀리초로 변환
  };

  useEffect(() => {
    if (token) {
      const expirationTime = getTokenExpirationTime(token); // 만료 시간
      const updateRemainingTime = () => {
        const currentTime = Date.now(); // 현재 시간
        const remainingTime = Math.max(0, expirationTime - currentTime); // 남은 시간 계산
        setTimeLeft(Math.floor(remainingTime / 1000)); // 초 단위로 상태 업데이트

        if (remainingTime <= 0) {
          logout(); // 시간이 다되면 로그아웃
        }
      };

      updateRemainingTime(); // 초기 업데이트
      const interval = setInterval(updateRemainingTime, 1000); // 1초마다 업데이트

      return () => clearInterval(interval);
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

  return { timeLeft };
};
