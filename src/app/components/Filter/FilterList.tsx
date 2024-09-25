'use client';

import { useRef, useState, useEffect } from 'react';

import { IconCaret } from '@/public/icons';
import DropDown from '../DropDown/DropDown';

interface FilterListProps {
  state?: 'default' | 'active';
  children: string;
  options?: string[];
  onSelect?: (selectedOption: string | undefined) => void;
}

const stateClasses = {
  default: 'border border-var-gray-100 bg-var-gray-50 text-var-gray-800',
  active: 'text-var-gray-50 bg-var-gray-900',
};

const FilterList = ({
  state = 'default',
  children,
  options = [],
  onSelect,
}: FilterListProps) => {
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
      <div
        className={`flex h-36 w-[110px] cursor-pointer items-center justify-between rounded-[12px] py-[6px] pl-12 pr-8 text-14 font-medium md:h-40 md:w-120 md:py-8 ${stateClasses[currentState]}`}
        onClick={toggleDropDown}
      >
        {selectedOption || children}
        <IconCaret className='h-24 w-24' />
      </div>

      {isOpen && (
        <DropDown
          options={[children, ...options]}
          onSelect={handleOptionSelect}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default FilterList;
