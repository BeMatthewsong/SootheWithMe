'use client';

import { IconX } from '@/public/icons';
import Button from '../Button/Button';

/**
 * Popup component
 * @param {string} type - 팝업 타입 (exit, signUpCompleted)
 * @param {boolean} hasCancelButton - 취소 버튼 유무
 * @param {function} onClickClosePopup - 팝업 닫기 버튼 클릭 시 실행 함수
 * @param {function} onClickCancel - 취소 버튼 클릭 시 실행 함수
 * @param {function} onClickConfirm - 확인 버튼 클릭 시 실행 함수
 */

interface PopupProps {
  type: 'exit' | 'signUpCompleted';
  hasCancelButton: boolean;
  onClickClose?: () => void;
  onClickConfirm?: () => void;
}

const Popup = ({
  type = 'exit',
  hasCancelButton = true,
  onClickClose,
  onClickConfirm,
}: PopupProps) => {
  return (
    <div
      className={`flex ${type === 'exit' ? 'h-212 w-[450px]' : 'h-200 w-300'} flex-col items-center justify-between gap-24 rounded-lg bg-var-white p-24`}
    >
      {/* 닫기 버튼 */}
      <div className='flex w-full justify-end'>
        <button data-testid='close-modal-button' onClick={onClickClose}>
          <IconX className='h-24 w-24' />
        </button>
      </div>
      {/* 팝업 내용 */}
      <p className='text-center text-16 font-medium'>
        {type === 'exit' ? (
          <>
            정말 나가시겠어요? <br /> 작성된 내용이 모두 삭제됩니다.
          </>
        ) : (
          '가입이 완료되었습니다.'
        )}
      </p>
      {/* 버튼 그룹 */}
      <div
        className={`flex w-full ${hasCancelButton ? 'justify-center gap-8' : 'justify-end'}`}
      >
        {hasCancelButton && (
          <div className='w-120'>
            <Button name='취소' variant='white' onClick={onClickClose} />
          </div>
        )}
        <div className='w-120'>
          <Button name='확인' variant='default' onClick={onClickConfirm} />
        </div>
      </div>
    </div>
  );
};

export default Popup;
