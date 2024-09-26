'use client';

import { useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface CalendarProps {
  dateTime: Date | null;
  setDateTime: (date: Date | null) => void;
}

const Calendar = ({ dateTime, setDateTime }: CalendarProps) => {
  const datepickerRef = useRef(null);

  return (
    <div className='space-y-12 text-16 font-semibold'>
      <h2>날짜</h2>
      <div className='flex w-full items-center justify-center rounded-xl border border-var-gray-200 py-16'>
        <div className='w-252'>
          <DatePicker
            id='datepicker'
            locale='ko'
            ref={datepickerRef}
            dateFormat='yyyy-MM-dd'
            selected={dateTime}
            onChange={(date) => setDateTime(date as Date)}
            minDate={new Date()}
            inline
          />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
