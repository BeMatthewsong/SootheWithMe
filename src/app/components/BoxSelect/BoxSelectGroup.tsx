'use client';

import { ChangeEvent, useState } from 'react';
import BoxSelect from './BoxSelect';

const BoxSelectGroup = () => {
  const [isSelected, setIsSelected] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

  // 다중 선택이 안 되고 1개만 선택 가능하다
  const handleCheckboxChange = (index: number) => {
    // 한 번 더 클릭하면 선택 해제
    if (isSelected[index]) {
      setIsSelected([false, false, false]);
      return;
    }
    const newSelected = isSelected.map((_, i) => i === index);
    setIsSelected(newSelected);
  };

  return (
    <div className='flex gap-12'>
      <BoxSelect
        title='달램핏'
        subTitle='오피스 트레이닝'
        isSelected={isSelected[0]}
        handleCheckboxChange={() => handleCheckboxChange(0)}
      />
      <BoxSelect
        title='달램핏'
        subTitle='마인드풀니스'
        isSelected={isSelected[1]}
        handleCheckboxChange={() => handleCheckboxChange(1)}
      />
      <BoxSelect
        title='워케이션'
        isSelected={isSelected[2]}
        handleCheckboxChange={() => handleCheckboxChange(2)}
      />
    </div>
  );
};

export default BoxSelectGroup;
