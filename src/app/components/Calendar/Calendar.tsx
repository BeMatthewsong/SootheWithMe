// 커스텀해서 사용할 수 있는 캘린더 컴포넌트
// 커스텀 원하시면 styles/style.css 코드를 참고하시면 됩니다.
'use client';

import { MAKING_GATHERING_DATE_DEADLINE } from '@/constants/common';
import { adjustDate } from '@/utils/formatDate';
import { useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface CalendarProps {
  dateTime: Date | null;
  setDateTime: (date: Date | null) => void;
  dateFormat: 'yyyy-MM-dd' | 'yyyy-MM-dd HH:mm';
  changeStartDays?: number;
  changeEndDays?: number;
  inline?: boolean;
}
const Calendar = ({
  dateTime,
  setDateTime,
  dateFormat = 'yyyy-MM-dd',
  changeStartDays = 0, // 이전 날짜 설정 (음수를 넣어주세요)
  changeEndDays = MAKING_GATHERING_DATE_DEADLINE, // 이후 날짜 설정 (양수를 넣어주세요)
  inline = false,
}: CalendarProps) => {
  const datepickerRef = useRef(null);

  return (
    <DatePicker
      id='datepicker'
      ref={datepickerRef}
      shouldCloseOnSelect
      dateFormat={dateFormat}
      selected={dateTime}
      onChange={(date) => setDateTime(date as Date)}
      minDate={adjustDate(new Date(), changeStartDays)}
      maxDate={adjustDate(new Date(), changeEndDays)}
      inline={inline}
    />
  );
};

export default Calendar;
