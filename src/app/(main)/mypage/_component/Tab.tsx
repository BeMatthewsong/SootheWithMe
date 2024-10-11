'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabList = [
  {
    name: '나의 모임',
    link: ['/mypage'],
  },
  {
    name: '나의 리뷰',
    link: ['/mypage/review/writable', '/mypage/review/written'],
  },
  {
    name: '내가 만든 모임',
    link: ['/mypage/created'],
  },
];

const Tab = () => {
  const pathname = usePathname();

  const activeClass =
    'border-b-2 border-var-gray-900 pb-4 text-var-gray-900 dark:text-white dark:border-neutral-50';

  return (
    <ul className='flex items-start gap-12 text-18 font-semibold text-var-gray-400 dark:text-neutral-500'>
      {tabList.map((item, index) => (
        <li
          key={index}
          className={item.link.includes(pathname) ? activeClass : ''}
        >
          <Link href={item.link[0]}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Tab;
