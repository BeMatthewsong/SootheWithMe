'use client';

import Calendar from '../../Calendar/Calendar';

interface CalendarSelectProps {
  dateTime: Date | null;
  setDateTime: (date: Date | null) => void;
}

const CalendarSelect = ({ dateTime, setDateTime }: CalendarSelectProps) => {
  return (
    <div className='space-y-12 text-16 font-semibold'>
      <h2>날짜</h2>
      <div className='flex h-300 w-full items-center justify-center rounded-xl border border-var-gray-200 py-16'>
        <div className='w-252'>
          <Calendar
            dateFormat={'yyyy-MM-dd'}
            dateTime={dateTime}
            setDateTime={setDateTime}
            changeStartDays={1} // 하루 후부터 선택 가능
            inline={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarSelect;
