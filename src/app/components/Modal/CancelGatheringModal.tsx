'use client';

import Button from '../Button/Button';
import ModalFrame from './ModalFrame';
import ModalHeader from './ModalHeader';

interface CancelGatheringModalProps {
  onClose: () => void;
  onClick?: () => void;
}

const CancelGatheringModal = ({
  onClose,
  onClick,
}: CancelGatheringModalProps) => {
  return (
    <ModalFrame onClose={onClose}>
      <div className='flex max-h-328 w-320 flex-col gap-24 rounded-xl bg-var-white p-24 md:w-440 dark:border dark:border-neutral-600 dark:bg-neutral-800'>
        <ModalHeader title={''} onClose={onClose} />
        <div className='text-center text-16 font-medium'>
          모임을 정말 취소하시겠습니까?
        </div>
        <div className='flex items-center gap-16'>
          {/* 버튼 그룹 */}
          <div className={'flex w-full justify-center gap-8'}>
            <div className='w-120'>
              <Button name='취소' variant='white' onClick={onClose} />
            </div>
            <div className='w-120'>
              <Button name='확인' variant='default' onClick={onClick} />
            </div>
          </div>
        </div>
      </div>
    </ModalFrame>
  );
};

export default CancelGatheringModal;
