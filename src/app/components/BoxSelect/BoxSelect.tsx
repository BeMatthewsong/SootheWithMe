'use client';

import { ChangeEvent, useState } from 'react';

/**
 * BoxSelect component
 * @param {string} title - 제목
 *  @param {string} subTitle - 부제목
 */

interface BoxSelectProps {
  title: string;
  subTitle: string;
}

const BoxSelect = ({ title = '', subTitle = '' }: BoxSelectProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsSelected(event.target.checked);
  };

  return (
    <label
      className={`flex h-76 w-full items-start gap-8 rounded-lg ${isSelected ? 'bg-var-gray-900 text-var-white' : 'bg-var-gray-50 text-var-black'} md:h-70 lg:h-70 px-8 py-[6px] transition-colors duration-200 ease-in-out md:px-16 md:py-12`}
    >
      <input
        id='checkbox'
        type='checkbox'
        className="h-24 w-24 appearance-none rounded-md bg-[url('/icons/checkbox-default.svg')] bg-center bg-no-repeat checked:bg-[url('/icons/checkbox-active.svg')] checked:bg-center checked:bg-no-repeat"
        onChange={handleCheckboxChange}
      />
      <div className='flex flex-col'>
        <div className='text-14 md:text-16 font-bold'>{title}</div>
        <div className='text-12 font-medium'>{subTitle}</div>
      </div>
    </label>
  );
};

export default BoxSelect;
