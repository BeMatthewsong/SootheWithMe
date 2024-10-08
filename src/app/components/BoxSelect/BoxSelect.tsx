'use client';

import { ChangeEvent } from 'react';

/**
 * BoxSelect component
 * @param {string} title - 제목
 *  @param {string} subTitle - 부제목
 */

interface BoxSelectProps {
  title: string;
  subTitle?: string;
  isSelected: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const stateClasses = {
  default: 'bg-var-gray-50 text-var-black',
  active: 'bg-var-gray-900 text-var-white',
};

const BoxSelect = ({
  title = '',
  subTitle = '',
  isSelected,
  onChange,
}: BoxSelectProps) => {
  return (
    <label
      data-testid='box-select'
      className={`flex h-76 w-full items-start gap-8 rounded-lg ${isSelected ? stateClasses.active : stateClasses.default} md:h-70 lg:h-70 px-8 py-[6px] transition-colors duration-200 ease-in-out md:px-16 md:py-12`}
    >
      <input
        id='checkbox'
        type='checkbox'
        className="h-24 w-24 appearance-none rounded-md bg-[url('/icons/checkbox-default.svg')] bg-center bg-no-repeat checked:bg-[url('/icons/checkbox-active.svg')] checked:bg-center checked:bg-no-repeat"
        checked={isSelected}
        onChange={onChange}
      />
      <div className='flex flex-col'>
        <div className='text-14 font-bold md:text-16'>{title}</div>
        <div className='text-12 font-medium'>{subTitle}</div>
      </div>
    </label>
  );
};

export default BoxSelect;
