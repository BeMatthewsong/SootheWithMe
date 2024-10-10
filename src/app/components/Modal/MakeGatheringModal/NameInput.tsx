import { Dispatch, SetStateAction } from 'react';
import Input from '../../Input/Input';

interface NameInputProps {
  setName: Dispatch<SetStateAction<string>>;
}
const NameInput = ({ setName }: NameInputProps) => {
  return (
    <div className='space-y-12 text-16 font-semibold'>
      <h2>이름</h2>
      <Input
        className='bg-var-gray-50 px-16 py-[10px]'
        placeholder='모임 이름을 입력해주세요.'
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
};

export default NameInput;
