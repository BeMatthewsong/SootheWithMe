'use client';

import { useRef, useState, useEffect } from 'react';

import { IconCaret, IconSort } from '@/public/icons';
import DropDown from '../DropDown/DropDown';

// 상위 Filter 컴포넌트의 props 타입
interface FilterProps {
  state?: 'default' | 'active';
  children: string;
  options?: string[];
  type?: 'list' | 'sort';
  onSelect?: (selectedOption: string | undefined) => void;
}

// Filter 하위의 FilterList, FilterSort 컴포넌트의 props 타입
interface FilterChildProps {
  currentState: 'default' | 'active';
  toggleDropDown: () => void;
  text: string;
}

// 하위 컴포넌트 - FilterList
const FilterList = ({
  currentState,
  toggleDropDown,
  text,
}: FilterChildProps) => (
  <div
    className={`flex h-36 w-[110px] cursor-pointer items-center justify-between rounded-[12px] py-[6px] pl-12 pr-8 text-14 font-medium md:h-40 md:w-120 md:py-8 ${stateClasses[currentState]}`}
    onClick={toggleDropDown}
    data-testid='filter-component'
  >
    {text}
    <IconCaret className='h-24 w-24' />
  </div>
);

// 하위 컴포넌트 - FilterSort
const FilterSort = ({
  currentState,
  toggleDropDown,
  text,
}: FilterChildProps) => (
  <div
    className={`flex h-36 w-36 cursor-pointer items-center justify-between rounded-[12px] p-[6px] text-[13px] font-medium md:h-40 md:w-120 md:px-12 md:py-[6px] ${stateClasses[currentState]}`}
    onClick={toggleDropDown}
    data-testid='filter-component'
  >
    <IconSort className='h-24 w-24' />
    <span className='hidden md:mr-8 md:inline'>{text}</span>
  </div>
);

// state 별 클래스명
const stateClasses = {
  default: 'border border-var-gray-100 bg-var-gray-50 text-var-gray-800',
  active: 'text-var-gray-50 bg-var-gray-900',
};

// Filter Wrapper 컴포넌트
const Filter = ({
  state = 'default',
  children,
  options = [],
  type = 'list',
  onSelect,
}: FilterProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [currentState, setCurrentState] = useState<'default' | 'active'>(state);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleOptionSelect = (option: string) => {
    if (option === children) {
      setSelectedOption(null);
      setIsOpen(false);
      setCurrentState('default');
      onSelect?.(undefined);
    } else {
      setSelectedOption(option);
      setIsOpen(false);
      setCurrentState('active');
      onSelect?.(option);
    }
  };

  const toggleDropDown = () => {
    setIsOpen((prev) => !prev);
  };

  // 외부 클릭 시 드롭다운 닫힘
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
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
    <div className='relative' ref={containerRef}>
      {type === 'list' ? (
        <FilterList
          currentState={currentState}
          toggleDropDown={toggleDropDown}
          text={selectedOption || children}
        />
      ) : (
        <FilterSort
          currentState={currentState}
          toggleDropDown={toggleDropDown}
          text={selectedOption || children}
        />
      )}

      {isOpen && (
        <DropDown
          options={[children, ...options]}
          onSelect={handleOptionSelect}
          onClose={() => setIsOpen(false)}
          classnames={type === 'sort' ? 'min-w-max right-0' : ''}
        />
      )}
    </div>
  );
};

export default Filter;
