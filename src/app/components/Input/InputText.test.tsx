import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputText from './InputText';

describe('InputText 컴포넌트', () => {
  /* 기본 렌더링 테스트 */
  it('renders correctly', () => {
    render(<InputText value='' onChange={() => {}} />);
    const textareaElement = screen.getByRole('textbox');
    expect(textareaElement).toBeInTheDocument();
  });

  /* 플레이스홀더 텍스트가 제대로 표시되는지 테스트 */
  it('displays placeholder text correctly', () => {
    render(
      <InputText
        value=''
        placeholder='할 일의 제목을 적어주세요.'
        onChange={() => {}}
      />,
    );
    const textareaElement =
      screen.getByPlaceholderText('할 일의 제목을 적어주세요.');
    expect(textareaElement).toBeInTheDocument();
  });

  /* 입력 값이 올바르게 설정되는지 테스트 */
  it('sets input value correctly', () => {
    render(<InputText value='test@example.com' onChange={() => {}} />);
    const textareaElement = screen.getByDisplayValue('test@example.com');
    expect(textareaElement).toBeInTheDocument();
  });

  /* className 속성이 적용되는지 테스트 */
  it('applies className prop', () => {
    render(<InputText value='' className='h-[200px]' onChange={() => {}} />);
    const textareaElement = screen.getByRole('textbox');
    expect(textareaElement).toHaveClass('h-[200px]');
  });

  /* onChange 핸들러가 호출되는지 테스트 */
  it('calls onChange handler', () => {
    const handleChange = jest.fn();
    render(<InputText value='' onChange={handleChange} />);
    const textareaElement = screen.getByRole('textbox');
    fireEvent.change(textareaElement, { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  /* spellCheck 속성이 true로 설정되는지 테스트 */
  it('sets spellCheck attribute to true', () => {
    render(<InputText value='' spellCheck={true} onChange={() => {}} />);
    const textareaElement = screen.getByRole('textbox');
    expect(textareaElement).toHaveAttribute('spellcheck', 'true');
  });

  /* spellCheck 속성이 false로 설정되는지 테스트 */
  it('sets spellCheck attribute to false', () => {
    render(<InputText value='' spellCheck={false} onChange={() => {}} />);
    const textareaElement = screen.getByRole('textbox');
    expect(textareaElement).toHaveAttribute('spellcheck', 'false');
  });
});
