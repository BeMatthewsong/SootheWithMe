'use client';

import { useState, useRef, useEffect } from 'react';

// mock data
const OPTIONS = [
  '건대입구',
  '을지로 3가',
  '신림',
  '홍대입구',
  '시청',
  '신대방',
  '서울대입구',
];

interface DropDownProps {
  options: string[];
  placeholder?: string;
}

const DropDown = ({
  options = OPTIONS,
  placeholder = '위치를 선택하세요.',
}: DropDownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

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
    <div
      className='relative w-full font-pretendard text-[14px] font-medium md:text-[16px]'
      ref={dropDownRef}
    >
      <div
        className='w-full cursor-pointer rounded-xl px-12 py-12 text-var-black ring-2 ring-var-gray-400 focus:outline-none md:px-16'
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption || placeholder}
      </div>

      {isOpen && options.length > 0 && (
        <ul className='absolute mt-4 max-h-240 w-full overflow-y-auto rounded-xl bg-var-gray-50 ring-2 ring-var-gray-400'>
          {options.map((option, index) => (
            <li
              key={index}
              className='cursor-pointer px-12 py-12 text-var-black hover:bg-var-orange-100 md:px-16'
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}

      {isOpen && options.length === 0 && (
        <div className='absolute w-full rounded-xl bg-var-white px-12 py-12 text-var-black ring-2 ring-var-gray-400 md:px-16'>
          일치하는 결과가 없습니다.
        </div>
      )}
    </div>
  );
};

export default DropDown;
