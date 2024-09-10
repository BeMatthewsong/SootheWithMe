'use client';

import { Logo } from '@/public/images';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import UserStatus from './UserStatus';
import TopTab from '../Tab/TopTab';
import Badge from '../Badge/Badge';

/* @todo 웹 스토리지에 저장된 찜한 모임의 length를 추출하는 방식으로 변경 예정 */
const favoriteGroups = '12';

//@todo pathname 정해질 시 추가 예정
const navList = [
  {
    name: '모임 찾기',
    link: '#',
  },
  {
    name: '찜한 모임',
    link: '#',
  },
  {
    name: '모든 리뷰',
    link: '#',
  },
];

const Gnb = () => {
  const pathname = usePathname();

  /* 찜한 모임 배지 렌더링 함수
  nav.name이 '찜한 모임'이고 웹스토리지에 저장된 '찜한 모임'의 개수가 1개 이상일 시 Badge 렌더링 */
  const renderBadge = (name: string) => {
    return name === '찜한 모임' && Number(favoriteGroups) > 0 ? (
      <div className='py-[18px]'>
        <Badge>{favoriteGroups}</Badge>
      </div>
    ) : null;
  };

  return (
    <header className='border-b-2 border-var-gray-900 bg-var-orange-600'>
      <div className='mx-16 flex max-w-[1200px] items-center justify-between md:mx-24 lg:mx-auto'>
        <nav className='flex items-center'>
          <Link href='/'>
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
                {renderBadge(nav.name)}
              </li>
            ))}
          </ul>
        </nav>
        <UserStatus />
      </div>
    </header>
  );
};

export default Gnb;
