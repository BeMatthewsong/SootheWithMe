'use client';

import { useRef, useState, useEffect } from 'react';

import { IconCaret } from '@/public/icons';
import DropDown from '@/app/components/DropDown/DropDown';

interface PlaceDropdownProps {
  state?: 'default' | 'active';
  selectedOption: string | null;
  setSelectedOption: (option: string | null) => void;
  children: string;
  options?: string[];
}

const stateClasses = {
  default:
    'border border-var-gray-100 bg-var-gray-50 text-var-gray-400 dark:bg-neutral-900 dark:border-none dark:text-neutral-100',
  active:
    'text-var-gray-800 bg-var-gray-50 dark:border dark:bg-var-gray-100 dark:border-var-gray-100 dark:text-var-gray-800',
};

const PlaceDropdown = ({
  state = 'default',
  selectedOption,
  setSelectedOption,
  children,
  options = [],
}: PlaceDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentState, setCurrentState] = useState<'default' | 'active'>(state);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleOptionSelect = (option: string) => {
    if (option === children) {
      setSelectedOption(null);
      setIsOpen(false);
      setCurrentState('default');
    } else {
      setSelectedOption(option);
      setIsOpen(false);
      setCurrentState('active');
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
      <div className='space-y-12 text-16 font-semibold'>
        <h2>장소</h2>
        <div
          className={`h- mb-8 flex w-full cursor-pointer items-center justify-between rounded-xl py-[6px] pl-12 pr-8 text-16 font-semibold md:h-44 md:py-[10px] ${stateClasses[currentState]}`}
          onClick={toggleDropDown}
        >
          {selectedOption || children}
          <IconCaret
            className={`h-24 w-24 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
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

export default PlaceDropdown;
