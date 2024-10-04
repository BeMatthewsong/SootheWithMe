'use client';

import { Logo } from '@/public/images';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import UserStatus from './UserStatus';
import TopTab from '../Tab/TopTab';
import Badge from '../Badge/Badge';
import { useSavedGatheringList } from '@/context/SavedGatheringContext';
import { useEffect, useState } from 'react';
import { UserData } from '@/types/client.type';
import TokenExpirationTimer from './TokenExpirationTimer';

const navList = [
  {
    name: '모임 찾기',
    link: '/gatherings',
  },
  {
    name: '찜한 모임',
    link: '/saved',
  },
  {
    name: '모든 리뷰',
    link: '/reviews',
  },
];

interface GnbProps {
  user: UserData | null;
}

const Gnb = ({ user }: GnbProps) => {
  const pathname = usePathname();

  const { savedGatherings } = useSavedGatheringList();
  const [savedCount, setSavedCount] = useState<number>(0);

  useEffect(() => {
    setSavedCount(savedGatherings.length);
  }, [savedGatherings]);

  return (
    <header className='fixed left-0 top-0 z-popup w-full border-b-2 border-var-gray-900 bg-var-orange-600'>
      <div className='mx-16 flex max-w-[1200px] items-center justify-between md:mx-24 lg:mx-auto'>
        <nav className='flex items-center'>
          <Link href='/gatherings'>
            <Logo className='mr-20 h-40 w-72' />
          </Link>
          <ul className='flex gap-24'>
            {navList.map((nav, index) => (
              <li key={index} className='flex items-center gap-[5px]'>
                <Link href={nav.link}>
                  <TopTab isActive={pathname.includes(nav.link)}>
                    {nav.name}
                  </TopTab>
                </Link>
                {/* nav.name이 '찜한 모임'이고 웹스토리지에 저장된 '찜한 모임'의 개수가 1개 이상일 시 Badge 렌더링 */}
                {nav.name === '찜한 모임' && savedCount > 0 && (
                  <div className='py-[18px]'>
                    <Badge>{savedCount}</Badge>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className='flex items-center gap-12'>
          {user && <TokenExpirationTimer user={user} />}
          <UserStatus user={user} />
        </div>
      </div>
    </header>
  );
};

export default Gnb;
