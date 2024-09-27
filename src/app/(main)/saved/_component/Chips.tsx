'use client';

import { useState } from 'react';

import Chip from '@/app/components/Chip/Chip';

interface ChipsProps {
  activeTab: 'DALLAEMFIT' | 'WORKATION';
  selectedChip: 'ALL' | 'OFFICE_STRETCHING' | 'MINDFULNESS';
  onChipClick: (label: 'ALL' | 'OFFICE_STRETCHING' | 'MINDFULNESS') => void;
}

const Chips = ({ activeTab, selectedChip, onChipClick }: ChipsProps) => {
  return (
    <div className='mt-8 space-x-8 py-16'>
      <Chip
        state={selectedChip === 'ALL' ? 'active' : 'default'}
        onClick={
          activeTab === 'WORKATION' ? undefined : () => onChipClick('ALL')
        }
      >
        전체
      </Chip>
      {/* activeTab이 'WORKATION'이 아닐 때만 다른 Chip을 렌더링 */}
      {activeTab === 'DALLAEMFIT' && (
        <>
          <Chip
            state={selectedChip === 'OFFICE_STRETCHING' ? 'active' : 'default'}
            onClick={() => onChipClick('OFFICE_STRETCHING')}
          >
            오피스 스트레칭
          </Chip>
          <Chip
            state={selectedChip === 'MINDFULNESS' ? 'active' : 'default'}
            onClick={() => onChipClick('MINDFULNESS')}
          >
            마인드풀니스
          </Chip>
        </>
      )}
    </div>
  );
};

export default Chips;
