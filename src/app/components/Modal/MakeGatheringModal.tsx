'use client';

import ModalPlaceDropdown from '@/app/(main)/gatherings/_component/ModalPlaceDropdown';
import { GATHERING_TIMES } from '@/constants/common';
import { IconX } from '@/public/icons';
import { ChangeEvent, MouseEvent, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import { MOCK_DROPDOWN_OPTIONS } from '../BottomFloatingBar/Mock';
import BoxSelectGroup from '../BoxSelect/BoxSelectGroup';
import Button from '../Button/Button';
import TimeChip from '../Chip/TimeChip';
import Input from '../Input/Input';
import ModalFrame from './ModalFrame';

interface MakeGatheringModalProps {
  onClose: () => void;
}

// TODO: 여러 컴포넌트로 쪼개기 (리팩토링 단계)
const MakeGatheringModal = ({ onClose }: MakeGatheringModalProps) => {
  const [fileName, setFileName] = useState<null | string>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const datepickerRef = useRef(null);

  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      const [file] = files;
      setFileName(file.name);
    }
  };

  return (
    <ModalFrame onClose={onClose}>
      <div
        onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        className='flex h-full w-full flex-col gap-24 overflow-y-auto rounded-none bg-var-white p-24 md:h-auto md:w-532 md:rounded-xl'
      >
        <div className='flex items-center justify-between'>
          <h1 className='text-18 font-semibold text-var-gray-900'>
            모임 만들기
          </h1>
          <button onClick={onClose}>
            <IconX className='h-24 w-24' />
          </button>
        </div>
        {/* 장소 */}
        <div className='space-y-12 text-16 font-semibold'>
          <h2>장소</h2>
          <ModalPlaceDropdown options={MOCK_DROPDOWN_OPTIONS}>
            장소를 선택해주세요
          </ModalPlaceDropdown>
        </div>
        {/* 이미지 */}
        <div className='space-y-12 text-16 font-semibold'>
          <h2>이미지</h2>
          <div>
            <input
              ref={fileInputRef}
              type='file'
              className='hidden'
              onChange={handleChangeFile}
            />
            <div className='flex gap-12'>
              <div className='flex w-full items-center rounded-xl bg-gray-50 px-16 py-[10px]'>
                {fileName ?? (
                  <p className='text-gray-400'>이미지를 첨부해 주세요</p>
                )}
              </div>
              <div className='w-100'>
                <Button
                  name='파일 찾기'
                  variant='white'
                  onClick={() => fileInputRef.current?.click()}
                />
              </div>
            </div>
          </div>
        </div>
        {/* 선택 서비스 */}
        <div className='space-y-12 text-16 font-semibold'>
          <h2>선택 서비스</h2>
          <BoxSelectGroup />
        </div>
        {/* 날짜 */}
        <div className='space-y-12 text-16 font-semibold'>
          <h2>날짜</h2>
          <div className='flex w-full items-center justify-center rounded-xl border border-var-gray-200 py-16'>
            <div className='w-252'>
              {/* TODO: 날짜 컴포넌트 공통화 */}
              <DatePicker
                id='datepicker'
                locale='ko'
                ref={datepickerRef}
                dateFormat='yyyy-MM-dd'
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date as Date)}
                minDate={new Date()}
                inline
              />
            </div>
          </div>
        </div>
        {/* 시간 */}
        {/* TODO: 시간 버튼 상태 로직 추가 */}
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
        {/* 모집 정원 */}
        <div className='space-y-12 text-16 font-semibold'>
          <h2>모집정원</h2>
          <Input
            type='number'
            className='bg-var-gray-50 px-16 py-[10px]'
            placeholder='최소 5인 이상 입력해주세요.'
          />
        </div>
        {/* 버튼 */}
        <Button name='확인' variant={'gray'} />
      </div>
    </ModalFrame>
  );
};

export default MakeGatheringModal;
