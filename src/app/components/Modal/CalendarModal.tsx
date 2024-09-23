// 커스텀 원하시면 styles/style.css 코드를 참고하시면 됩니다.
'use client';

import { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../Button/Button';

interface CalendarModalProps {
  initialSelectedData: Date | null;
  handleClickButtons: (date?: Date) => void;
}

const CalendarModal = ({
  initialSelectedData,
  handleClickButtons,
}: CalendarModalProps) => {
  const datepickerRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    initialSelectedData,
  );

  return (
    <div className='flex h-328 w-336 flex-col items-center justify-center gap-12 rounded-xl bg-var-white px-44 py-24'>
      {/* 캘린더 */}
      <DatePicker
        id='datepicker'
        locale='ko'
        ref={datepickerRef}
        shouldCloseOnSelect
        dateFormat='yyyy-MM-dd' // 데이터 형식
        selected={selectedDate} // 선택된 날짜를 ReactDatePicker에 전달
        onChange={(date) => setSelectedDate(date as Date)}
        minDate={new Date()} // 오늘 이전의 날짜 선택 불가능하게 설정
        inline // 달력이 바로 보여지도록 설정
      />
      {/* 버튼 그룹 */}
      <div className='flex gap-[6px]'>
        <div className='w-124'>
          <Button
            name='초기화'
            variant={`${selectedDate !== null ? 'white' : 'grayOutline'}`}
            onClick={() => {
              setSelectedDate(null);
              handleClickButtons();
            }}
          />
        </div>
        <div className='w-124'>
          <Button
            name='적용'
            variant={`${selectedDate !== null ? 'default' : 'gray'}`}
            onClick={() => {
              selectedDate && handleClickButtons(selectedDate);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
