'use client';

import BoxSelect from '../../BoxSelect/BoxSelect';

interface GatheringType {
  [key: string]: boolean;
}

interface BoxSelectGroupProps {
  gatheringType: GatheringType;
  setGatheringType: (type: (prevType: GatheringType) => GatheringType) => void;
}

const BoxSelectGroup = ({
  gatheringType,
  setGatheringType,
}: BoxSelectGroupProps) => {
  const handleCheckboxChange = (type: string) => {
    setGatheringType((prevType) => {
      const isSelected = prevType[type];
      if (isSelected) {
        return { ...prevType, [type]: false };
      } else {
        const newType = Object.keys(prevType).reduce((acc, key) => {
          acc[key] = false;
          return acc;
        }, {} as GatheringType);
        return { ...newType, [type]: true };
      }
    });
  };

  return (
    <div className='space-y-12 text-16 font-semibold'>
      <h2>선택 서비스</h2>
      <div className='flex gap-12'>
        <BoxSelect
          title='달램핏'
          subTitle='오피스 트레이닝'
          isSelected={gatheringType.OFFICE_STRETCHING}
          onChange={() => handleCheckboxChange('OFFICE_STRETCHING')}
        />
        <BoxSelect
          title='달램핏'
          subTitle='마인드풀니스'
          isSelected={gatheringType.MINDFULLNESS}
          onChange={() => handleCheckboxChange('MINDFULLNESS')}
        />
        <BoxSelect
          title='워케이션'
          isSelected={gatheringType.WORKATION}
          onChange={() => handleCheckboxChange('WORKATION')}
        />
      </div>
    </div>
  );
};

export default BoxSelectGroup;
