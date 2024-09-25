'use client';

import { useRef, useState, useEffect } from 'react';

import { IconSort } from '@/public/icons';
import DropDown from '../DropDown/DropDown';

interface FilterSortProps {
  state?: 'default' | 'active';
  options: string[];
  children: string;
  onSelect?: (option: string) => void;
}

const stateClasses = {
  default: 'border border-var-gray-100 bg-var-gray-50 text-var-gray-800',
  active: 'text-var-gray-50 bg-var-gray-900',
};

const FilterSort = ({
  state = 'default',
  options = [],
  children,
  onSelect,
}: FilterSortProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [currentState, setCurrentState] = useState<'default' | 'active'>(state);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleOptionSelect = (option: string) => {
    if (option === children) {
      setSelectedOption(null);
      setIsOpen(false);
      setCurrentState('default');
      onSelect?.('');
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
        className={`flex h-36 w-36 cursor-pointer items-center justify-between rounded-[12px] p-[6px] text-[13px] font-medium md:h-40 md:w-120 md:px-12 md:py-[6px] ${stateClasses[currentState]}`}
        onClick={toggleDropDown}
      >
        <IconSort className='h-24 w-24' />
        <span className='hidden md:mr-8 md:inline'>
          {selectedOption || children}
        </span>
      </div>

      {isOpen && (
        <DropDown
          options={[children, ...options]}
          onSelect={handleOptionSelect}
          onClose={() => setIsOpen(false)}
          classnames='min-w-max right-0'
        />
      )}
    </div>
  );
};

export default FilterSort;
