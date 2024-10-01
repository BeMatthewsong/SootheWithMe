'use client';

import { GATHERING_TIMES } from '@/constants/common';
import TimeChip from '../../Chip/TimeChip';

interface SelectTimeChipProps {
  selectedTime: string | null;
  setSelectedTime: (time: string) => void;
}

const SelectTimeChip = ({
  selectedTime,
  setSelectedTime,
}: SelectTimeChipProps) => {
  return (
    <>
      <div className='space-y-8 text-14 font-semibold'>
        <h2>오전</h2>
        <div className='flex gap-8'>
          {GATHERING_TIMES.MORNING.map((time) => (
            <TimeChip
              key={time}
              state={selectedTime === time ? 'active' : 'default'}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </TimeChip>
          ))}
        </div>
      </div>
      <div className='space-y-8 text-14 font-semibold'>
        <h2>오후</h2>
        <div className='flex flex-wrap gap-8 md:flex-nowrap'>
          {GATHERING_TIMES.AFTERNOON.map((time) => (
            <TimeChip
              key={time}
              state={selectedTime === time ? 'active' : 'default'}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </TimeChip>
          ))}
        </div>
      </div>
    </>
  );
};

export default SelectTimeChip;
