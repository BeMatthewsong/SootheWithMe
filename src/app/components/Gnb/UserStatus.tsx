'use client';

import { Profile } from '@/public/images';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

/* user을 null로 설정하면 로그아웃된 상황을 볼 수 있습니다. */
const user = {
  name: 'test name',
};

const options = [{ name: '마이페이지' }, { name: '로그아웃' }];

const UserStatus = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

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

  return (
    <>
      {user ? (
        <div className='relative' ref={dropDownRef}>
          <Profile
            className='size-40 cursor-pointer'
            onClick={() => setIsOpen((prev) => !prev)}
          />
          {isOpen && (
            <ul className='absolute right-0 mt-8 max-h-240 w-120 overflow-y-auto rounded-xl bg-var-gray-50 lg:left-0'>
              {options.map((option, index) => (
                <li
                  key={index}
                  className='cursor-pointer px-16 py-12 text-[12px] font-medium text-var-black hover:bg-var-orange-100 md:px-16'
                >
                  {option.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <Link href='/signin'>
          {/* @todo 임시 경로입니다. */}
          <div className='text-[16px] font-semibold text-white'>로그인</div>
        </Link>
      )}
    </>
  );
};

export default UserStatus;
