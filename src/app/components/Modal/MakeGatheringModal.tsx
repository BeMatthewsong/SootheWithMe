'use client';

import postGatherings from '@/app/api/actions/gatherings/postGatherings';
import postGatheringToJoin from '@/app/api/actions/gatherings/postGatheringToJoin';

import { LOCATION_OPTIONS, MIN_PARTICIPANTS } from '@/constants/common';
import objectCheckFalseValue from '@/utils/objectCheckFalseValue';
import objectExtractTrueValue from '@/utils/objectExtractTrueValue';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

import Button from '../Button/Button';
import BoxSelectGroup from './MakeGatheringModal/BoxSelectGroup';
import CalendarSelect from './MakeGatheringModal/CalendarSelect';
import ImageUploader from './MakeGatheringModal/ImageUploader';
import NameInput from './MakeGatheringModal/NameInput';
import PlaceDropdown from './MakeGatheringModal/PlaceDropdown';
import RecruitmentNumber from './MakeGatheringModal/RecruitmentNumber';
import SelectTimeChip from './MakeGatheringModal/SelectTimeChip';
import ModalFrame from './ModalFrame';
import ModalHeader from './ModalHeader';

interface MakeGatheringModalProps {
  onClose: () => void;
}

const MakeGatheringModal = ({ onClose }: MakeGatheringModalProps) => {
  const router = useRouter();

  const [name, setName] = useState<string>('');
  const [location, setLocation] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [gatheringType, setGatheringType] = useState<Record<string, boolean>>({
    OFFICE_STRETCHING: false,
    MINDFULNESS: false,
    WORKATION: false,
  });
  const [dateTime, setDateTime] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [capacity, setCapacity] = useState<number>(0);

  // 캘린더의 날짜와 타임칩의 시간을 결합
  let combinedDateTime: Date | null = null;
  if (dateTime && selectedTime) {
    const [hours, minutes] = selectedTime.split(':').map(Number);
    combinedDateTime = new Date(dateTime);
    combinedDateTime.setHours(hours, minutes);
  }

  const isFormValid = () =>
    name &&
    location &&
    image &&
    !objectCheckFalseValue(gatheringType) &&
    dateTime &&
    selectedTime &&
    combinedDateTime &&
    capacity >= MIN_PARTICIPANTS;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('location', location!);
    formData.append('type', objectExtractTrueValue(gatheringType));
    formData.append('dateTime', (combinedDateTime as Date).toISOString());
    formData.append('capacity', capacity.toString());
    formData.append('image', image as File);

    const { success, message, data } = await postGatherings(formData);

    if (!success) {
      toast.error(message);
      onClose();
      return;
    }

    onClose();

    await postGatheringToJoin(data.id);

    router.push(`/gatherings/${data.id}`);

    toast.success(message);
  };

  return (
    <ModalFrame onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        className='flex h-full max-h-[100lvh] w-full overflow-y-auto rounded-none bg-var-white p-24 md:h-auto md:max-h-[90lvh] md:w-532 md:overflow-y-hidden md:rounded-xl md:pr-0 dark:border dark:border-neutral-600 dark:bg-neutral-800'
      >
        <div className='scrollbar-hide flex w-full flex-col gap-24 overflow-auto p-4 text-var-gray-900 md:pr-24 dark:text-white'>
          {/* 헤더 */}
          <ModalHeader title={'모임 만들기'} onClose={onClose} />

          {/* 모임 이름 */}
          <NameInput setName={setName} />

          {/* 장소 */}
          <PlaceDropdown
            options={LOCATION_OPTIONS}
            selectedOption={location}
            setSelectedOption={setLocation}
          >
            장소를 선택해주세요
          </PlaceDropdown>

          {/* 이미지 업로더 */}
          <ImageUploader setImage={setImage} />

          {/* 선택 서비스 */}
          <BoxSelectGroup
            gatheringType={gatheringType}
            setGatheringType={setGatheringType}
          />

          {/* 날짜 */}
          <CalendarSelect dateTime={dateTime} setDateTime={setDateTime} />

          {/* 시간 */}
          <SelectTimeChip
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />

          {/* 모집 정원 */}
          <RecruitmentNumber setCapacity={setCapacity} />

          {/* 확인 버튼 */}
          <Button
            name='확인'
            type='submit'
            variant={isFormValid() ? 'default' : 'gray'}
          />
        </div>
      </form>
    </ModalFrame>
  );
};

export default MakeGatheringModal;
