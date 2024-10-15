'use client';

import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { IconVisivilityOff, IconVisivilityOn } from '@/public/icons';

export const InputStyles = {
  base: 'w-full bg-var-gray-50 text-16 items-center gap-4 rounded-lg px-16 py-8 focus:ring-2 dark:bg-neutral-900',
  hover:
    'hover:ring-2 hover:ring-var-orange-300 dark:hover:ring-var-orange-800',
  focus: 'focus:ring-var-orange-600',
  error: 'ring-var-red ring-2', // form 사용시 에러메시지용 레이아웃
};

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  className?: string;
  type?: 'text' | 'password' | 'number';
  isPassword?: boolean;
}

/**
 * Input 컴포넌트 정의
 *
 * 기본적으로 사용하는 Input 컴포넌트입니다.
 * 하위의 Props를 사용하여 Input의 모든 요소에 접근하여 사용하실 수 있습니다.
 *
 * @param {boolean} [hasError=false] - 에러 상태를 나타내는 선택적 prop
 * @param {string} [className=''] - 추가적인 사용자 정의 클래스 이름
 * @param {InputHTMLAttributes<HTMLInputElement>} rest - Input 요소의 모든 속성을 Props로 받아 사용할 수 있습니다.
 * @param {Ref<HTMLInputElement>} ref - forwardRef를 사용하여 전달받은 ref
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      hasError = false,
      className = '',
      isPassword = false,
      type = 'text',
      ...rest
    },
    ref,
  ) => {
    const [inputType, setInputType] = useState<'password' | 'text'>(
      isPassword ? 'password' : 'text',
    );

    return (
      <div className='relative'>
        <input
          ref={ref}
          type={inputType}
          className={`${InputStyles.base} hover: ${InputStyles.hover} focus: ${InputStyles.focus} ${hasError && InputStyles.error} ${className}`}
          {...rest}
        />
        {isPassword && (
          <button
            type='button'
            onClick={() => {
              setInputType((prevType) =>
                prevType === 'password' ? 'text' : 'password',
              );
            }}
            tabIndex={-1}
            className='absolute right-16 top-1/2 size-24 -translate-y-1/2'
          >
            {inputType === 'password' ? (
              <IconVisivilityOff />
            ) : (
              <IconVisivilityOn />
            )}
          </button>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
