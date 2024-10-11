'use client';

import { TokenExpirationTimer } from '@/utils/TokenExpirationTimer';

const TimerStyle = {
  gnb: 'hidden text-14 font-semibold text-var-orange-50 md:block md:text-16 w-140',
  dropdown:
    'px-16 py-12 text-[12px] font-medium text-var-black hover:bg-var-orange-100 md:px-16',
};

interface TokenExpirationTimerLayoutProps {
  token: string | undefined;
  variant: 'gnb' | 'dropdown';
}

const TokenExpirationTimerLayout = ({
  token,
  variant,
}: TokenExpirationTimerLayoutProps) => {
  const { timeLeft, isLoggedIn } = TokenExpirationTimer(token);

  if (!isLoggedIn) {
    return null;
  }

  return timeLeft > 0 ? (
    <p className={TimerStyle[variant]}>
      {variant === 'gnb' ? (
        <>
          남은 시간: {Math.floor(timeLeft / 60)}분 {timeLeft % 60}초
        </>
      ) : (
        <>
          {Math.floor(timeLeft / 60)} : {timeLeft % 60}
        </>
      )}
    </p>
  ) : null;
};

export default TokenExpirationTimerLayout;
