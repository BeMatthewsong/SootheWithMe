'use client';

import postGatherings from '@/app/api/actions/gatherings/postGatherings';
import { LOCATION_OPTIONS } from '@/constants/common';
import { MouseEvent, useState } from 'react';
import Button from '../Button/Button';
import BoxSelectGroup from './MakeGatheringModal/BoxSelectGroup';
import Calendar from './MakeGatheringModal/Calendar';
import Header from './MakeGatheringModal/Header';
import ImageUploader from './MakeGatheringModal/ImageUploader';
import PlaceDropdown from './MakeGatheringModal/PlaceDropdown';
import RecruitmentNumber from './MakeGatheringModal/RecruitmentNumber';
import SelectTimeChip from './MakeGatheringModal/SelectTimeChip';
import ModalFrame from './ModalFrame';

interface MakeGatheringModalProps {
  onClose: () => void;
}

const MakeGatheringModal = ({ onClose }: MakeGatheringModalProps) => {
  const [location, setLocation] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [gatheringType, setGatheringType] = useState<Record<string, boolean>>({
    OFFICE_STRETCHING: false,
    MINDFULLNESS: false,
    WORKATION: false,
  });
  const [dateTime, setDateTime] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [capacity, setCapacity] = useState<number>(0);

  // true인 key 값만 필터링
  const getSelectedGatheringType = () => {
    const selectedGatheringType = String(
      Object.keys(gatheringType).filter((key) => gatheringType[key]),
    );
    return selectedGatheringType;
  };

  // 모든 gatheringType이 false인지 확인
  const isAllGatheringTypeFalse = () => {
    return Object.values(gatheringType).every((value) => value === false);
  };

  // // 오늘이면서 현재 시간보다 이전인 시간을 필터링
  const isPastTime = (time: string) => {
    const today = new Date();
    const todayDate = today.getDate();
    const selectedDate = dateTime?.getDate();

    const todayHour = today.getHours();
    const selectedHour = Number(time?.split(':')[0]);

    return todayDate === selectedDate ? todayHour + 1 > selectedHour : false;
  };

  const handleSubmit = async () => {
    if (!location || !dateTime || !image) {
      // Handle the error appropriately, e.g., show a message to the user
      return;
    }

    const res = await postGatherings({
      location,
      type: getSelectedGatheringType(),
      dateTime: dateTime.toISOString(),
      capacity,
      image,
    });
    onClose();
  };

  return (
    <ModalFrame onClose={onClose}>
      <div
        onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        className='flex h-full w-full flex-col gap-24 overflow-y-auto rounded-none bg-var-white p-24 md:h-auto md:w-532 md:rounded-xl'
      >
        {/* 헤더 */}
        <Header onClose={onClose} />
        {/* 장소 */}
        <PlaceDropdown
          options={LOCATION_OPTIONS}
          selectedOption={location}
          setSelectedOption={setLocation}
        >
          장소를 선택해주세요
        </PlaceDropdown>
        {/* 이미지 업로더 */}
        <ImageUploader image={image} setImage={setImage} />
        {/* 선택 서비스 */}
        <BoxSelectGroup
          gatheringType={gatheringType}
          setGatheringType={setGatheringType}
        />
        {/* 날짜 */}
        <Calendar dateTime={dateTime} setDateTime={setDateTime} />
        {/* 시간 */}
        <SelectTimeChip
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          isPastTime={isPastTime}
        />
        {/* 모집 정원 */}
        <RecruitmentNumber setCapacity={setCapacity} />
        {/* 확인 버튼 */}
        <Button
          name='확인'
          variant={
            location &&
            image &&
            !isAllGatheringTypeFalse() &&
            dateTime &&
            selectedTime &&
            capacity >= 5
              ? 'default'
              : 'gray'
          }
          onClick={handleSubmit}
        />
      </div>
    </ModalFrame>
  );
};

export default MakeGatheringModal;
