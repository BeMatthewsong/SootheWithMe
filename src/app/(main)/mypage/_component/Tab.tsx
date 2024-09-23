'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabList = [
  {
    name: '나의 모임',
    link: '/mypage',
  },
  {
    name: '나의 리뷰',
    link: '/mypage/review',
  },
  {
    name: '내가 만든 모임',
    link: '/mypage/created',
  },
];

const Tab = () => {
  const pathname = usePathname();

  const activeClass = 'border-b-2 border-var-gray-900 pb-4 text-var-gray-900';

  return (
    <ul className='flex items-start gap-12 text-18 font-semibold text-var-gray-400'>
      {tabList.map((item, index) => (
        <li key={index} className={pathname === item.link ? activeClass : ''}>
          <Link href={item.link}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Tab;
