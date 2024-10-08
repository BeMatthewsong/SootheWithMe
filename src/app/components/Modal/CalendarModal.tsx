'use client';

import { useState } from 'react';
import Button from '../Button/Button';
import Calendar from '../Calendar/Calendar';

interface CalendarModalProps {
  initialSelectedData: Date | null;
  handleClickButtons: (date?: Date) => void;
  CalendarProps?: { changeStartDays?: number; changeEndDays?: number };
}

const CalendarModal = ({
  initialSelectedData,
  handleClickButtons,
  CalendarProps,
}: CalendarModalProps) => {
  const [dateTime, setDateTime] = useState<Date | null>(initialSelectedData);

  const changeStartDays = CalendarProps?.changeStartDays ?? -365;
  const changeEndDays = CalendarProps?.changeEndDays ?? undefined;

  return (
    <div className='flex h-376 w-336 flex-col items-center justify-center gap-12 rounded-xl bg-var-white px-44 py-24'>
      {/* 캘린더 */}
      <Calendar
        dateTime={dateTime}
        setDateTime={setDateTime}
        dateFormat={'yyyy-MM-dd'}
        changeStartDays={changeStartDays} // 1년 전부터 선택 가능
        changeEndDays={changeEndDays}
        inline={true}
      />

      {/* 버튼 그룹 */}
      <div className='flex gap-[6px]'>
        <div className='w-124'>
          <Button
            name='초기화'
            variant={`${dateTime !== null ? 'white' : 'grayOutline'}`}
            onClick={() => {
              setDateTime(null);
              handleClickButtons();
            }}
          />
        </div>
        <div className='w-124'>
          <Button
            name='적용'
            variant={`${dateTime !== null ? 'default' : 'gray'}`}
            onClick={() => {
              dateTime && handleClickButtons(dateTime);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
