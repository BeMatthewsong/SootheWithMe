'use client';

import { useEffect, useState } from 'react';
import { FaAngleUp } from 'react-icons/fa6';

const ScrollTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 위치 감지
  const handleScroll = () => {
    const scrollHeight = window.scrollY;
    setIsVisible(scrollHeight > 1000); // 스크롤이 1000 이상일 때만 버튼 표시
  };

  // 페이지가 로드될 때 스크롤 이벤트를 설정
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 버튼 클릭 시 상단으로 스크롤
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type='button'
      aria-label='Scroll to top'
      onClick={scrollToTop}
      className={`z-scrollButton fixed bottom-20 right-16 flex h-48 w-48 items-center justify-center rounded-full bg-var-orange-500 text-white shadow-md ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ease-in-out dark:bg-var-orange-700`}
    >
      <FaAngleUp className='h-24 w-24' />
    </button>
  );
};

export default ScrollTopButton;
