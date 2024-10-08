'use client';

import Chip from '@/app/components/Chip/Chip';
import { GatheringChipsType, GatheringTabsType } from '@/types/client.type';

interface ChipsProps {
  activeTab: GatheringTabsType;
  activeChip: GatheringChipsType;
  onChipClick: (label: GatheringChipsType) => void;
}

const Chips = ({ activeTab, onChipClick, activeChip }: ChipsProps) => {
  const handleChipClick = (label: GatheringChipsType) => {
    activeChip !== label && onChipClick(label);
  };

  return (
    <div className='mt-8 flex space-x-8 py-16'>
      <Chip
        state={activeChip === 'ALL' ? 'active' : 'default'}
        onClick={
          activeTab === 'WORKATION' ? undefined : () => handleChipClick('ALL')
        }
      >
        전체
      </Chip>
      {/* activeTab이 'WORKATION'이 아닐 때만 다른 Chip을 렌더링 */}
      <div
        className={`space-x-8 transition-opacity duration-300 ease-in-out ${
          activeTab === 'DALLAEMFIT'
            ? 'opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      >
        <Chip
          state={activeChip === 'OFFICE_STRETCHING' ? 'active' : 'default'}
          onClick={() => handleChipClick('OFFICE_STRETCHING')}
        >
          오피스 스트레칭
        </Chip>
        <Chip
          state={activeChip === 'MINDFULNESS' ? 'active' : 'default'}
          onClick={() => handleChipClick('MINDFULNESS')}
        >
          마인드풀니스
        </Chip>
      </div>
    </div>
  );
};

export default Chips;
