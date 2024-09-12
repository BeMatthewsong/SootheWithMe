'use client';

import { IconVisivilityOff, IconVisivilityOn } from '@/public/icons';
import Input from './Input';
import { forwardRef, useState, InputHTMLAttributes } from 'react';

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

type PasswordType = 'password' | 'text';

/**
 * Input 컴포넌트 정의
 *
 * 비밀번호 타입에 사용하는 Input 컴포넌트입니다.
 * useState를 사용하여 button을 눌렀을 때 Input의 타입이 변경되면 렌더링되는 버튼이미지도 달라집니다.
 * 하위의 Props를 사용하여 Input의 모든 요소에 접근하여 사용하실 수 있습니다.
 *
 * @param {boolean} [hasError=false] - 에러 상태를 나타내는 선택적 prop
 * @param {InputHTMLAttributes<HTMLInputElement>} rest - Input 요소의 모든 속성을 Props로 받아 사용할 수 있습니다.
 * @param {Ref<HTMLInputElement>} ref - forwardRef를 사용하여 전달받은 ref
 */
const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ hasError = false, ...rest }, ref) => {
    const [type, setType] = useState<PasswordType>('password');

    return (
      <div className='relative'>
        <Input
          hasError={hasError}
          ref={ref}
          type={type}
          maxLength={16}
          {...rest}
        />
        <button
          type='button'
          onClick={() => {
            setType((prevType) =>
              prevType === 'password' ? 'text' : 'password',
            );
          }}
          tabIndex={-1}
        >
          <div className='absolute right-16 top-1/2 size-24 -translate-y-1/2'>
            {type === 'password' ? <IconVisivilityOff /> : <IconVisivilityOn />}
          </div>
        </button>
      </div>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
