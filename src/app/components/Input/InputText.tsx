'use client';

import { ChangeEvent } from 'react';
import { InputStyles } from './Input';

interface InputTextProps {
  value: string;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

/**
 * InputText 컴포넌트는 사용자가 입력할 수 있는 텍스트 영역을 제공합니다.
 * @param {Props} props - 컴포넌트의 속성
 * @param {string} props.value - 텍스트 영역의 값
 * @param {string} [props.placeholder] - 텍스트 영역의 플레이스홀더 텍스트
 * @param {function} props.onChange - 텍스트 영역 값이 변경될 때 호출되는 함수
 */
const InputText = ({ value, placeholder = '', onChange }: InputTextProps) => {
  return (
    <textarea
      className={`${InputStyles.base} h-full resize-none overflow-auto focus:outline-var-orange-300`}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      spellCheck={false}
    />
  );
};

export default InputText;
