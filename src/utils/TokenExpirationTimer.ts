import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { postUserLogoutData } from '@/app/api/actions/mypage/postUserLogoutData';
import toast from 'react-hot-toast';

import { EXPIRY_TIME } from '@/constants/common';
import { deleteCookie } from '@/app/api/actions/cookie/cookie';

export const TokenExpirationTimer = (token: string | undefined) => {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState<number>(EXPIRY_TIME / 1000); // 남은 시간 초기값
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // 로그인 상태 관리

  // 로컬 스토리지에서 남은 시간을 불러오는 함수
  const loadRemainingTime = () => {
    const storedTimeLeft = localStorage.getItem('timeLeft');
    if (storedTimeLeft) {
      setTimeLeft(parseInt(storedTimeLeft, 10));
    } else {
      const expirationTime = Date.now() + EXPIRY_TIME;
      const remainingTime = Math.max(
        0,
        Math.floor((expirationTime - Date.now()) / 1000),
      );
      setTimeLeft(remainingTime); // 초기값을 남은 시간으로 설정
      localStorage.setItem('timeLeft', remainingTime.toString()); // 남은 시간 저장
    }
  };

  // 타이머를 설정하는 함수
  const startTimer = () => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          logout();
          localStorage.removeItem('timeLeft'); // 시간 초기화
          return 0;
        }
        const newTimeLeft = prev - 1;
        localStorage.setItem('timeLeft', newTimeLeft.toString()); // 남은 시간 저장
        return newTimeLeft;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  };

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      loadRemainingTime(); // 남은 시간 불러오기

      const cleanupTimer = startTimer();

      return cleanupTimer; // 클린업 함수 반환
    } else {
      setIsLoggedIn(false);
      logout();
    }
  }, [token]);

  // 로그아웃 로직
  const logout = async () => {
    const result = await postUserLogoutData();
    if (result) {
      Promise.resolve()
        .then(() => {
          toast.success('로그아웃이 완료되었습니다.');
        })
        .then(() => {
          localStorage.removeItem('timeLeft'); // 로컬 스토리지에서 시간 삭제
        })
        .then(() => {
          deleteCookie('token'); // 쿠키에서 토큰 삭제
        })
        .then(() => {
          router.push('/gatherings');
        });
    } else {
      toast.error('로그아웃에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return { timeLeft, isLoggedIn };
};
