'use client';

import { deleteCookie } from '@/app/api/actions/cookie/cookie';
import { Profile } from '@/public/images';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserData } from '@/types/client.type';
import { postUserLogoutData } from '@/app/api/actions/mypage/postUserLogoutData';
import toast from 'react-hot-toast';
import TokenExpirationTimerLayout from './TokenExpirationTimerLayout';

interface UserStatusProps {
  user: UserData | null;
  token: string | undefined;
}

const UserStatus = ({ user, token }: UserStatusProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 로그아웃 로직
  const handleLogout = async () => {
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

  return (
    <>
      {user ? (
        <div className='relative' ref={dropDownRef}>
          <div className='relative size-40 cursor-pointer overflow-hidden rounded-full'>
            {user.image ? (
              <button onClick={() => setIsOpen((prev) => !prev)}>
                <Image fill src={user.image} alt='프로필 이미지' />
              </button>
            ) : (
              <Profile onClick={() => setIsOpen((prev) => !prev)} />
            )}
          </div>
          {isOpen && (
            <ul
              onClick={() => setIsOpen(false)}
              className='absolute right-0 mt-8 max-h-240 w-120 overflow-y-auto rounded-xl bg-var-gray-50 lg:left-0 dark:bg-neutral-200'
            >
              <Link href='/mypage'>
                <li className='cursor-pointer px-16 py-12 text-[12px] font-medium text-var-black hover:bg-var-orange-100 md:px-16'>
                  마이페이지
                </li>
              </Link>
              <li
                onClick={handleLogout}
                className='cursor-pointer px-16 py-12 text-[12px] font-medium text-var-black hover:bg-var-orange-100 md:px-16'
              >
                로그아웃
              </li>
              <li className='block md:hidden'>
                <TokenExpirationTimerLayout token={token} variant='dropdown' />
              </li>
            </ul>
          )}
        </div>
      ) : (
        <Link href='/signin'>
          <button className='text-[16px] font-semibold text-white'>
            로그인
          </button>
        </Link>
      )}
    </>
  );
};

export default UserStatus;
