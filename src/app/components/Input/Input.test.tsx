import { render, screen } from '@testing-library/react';
import Input from './Input';
import '@testing-library/jest-dom';
import { createRef } from 'react';

describe('Input Component', () => {
  /* 기본 렌더링 */
  it('renders correctly', () => {
    render(<Input placeholder='test' />);

    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  /* 플레이스홀더 텍스트가 제대로 표시된다 */
  it('displays placeholder text correctly', () => {
    render(<Input placeholder='Enter your email' />);
    const inputElement = screen.getByPlaceholderText('Enter your email');
    expect(inputElement).toBeInTheDocument();
  });

  /* 입력 값이 올바르게 설정된다 */
  it('sets input value correctly', () => {
    render(<Input value='test@example.com' onChange={() => {}} />);
    const inputElement = screen.getByDisplayValue('test@example.com');
    expect(inputElement).toBeInTheDocument();
  });

  /* type 속성이 제대로 설정된다 */
  it('sets type attribute correctly', () => {
    render(<Input type='password' aria-label='Input' />);
    const inputElement = screen.getByLabelText('Input');
    expect(inputElement).toHaveAttribute('type', 'password');
  });

  /* hasError prop이 true일 때 에러 스타일이 적용된다 */
  it('applies error styles when hasError is true', () => {
    render(<Input hasError />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveClass('ring-var-red ring-2');
  });

  /* className prop이 적용된다 */
  it('applies className prop', () => {
    render(<Input className='h-[200px]' />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveClass('h-[200px]');
  });

  /* className과 hasError prop이 동시에 적용될 때 className 스타일과 에러 스타일이 모두 적용된다 */
  it('applies both className and error styles when both props are set', () => {
    render(<Input className='h-[200px]' hasError />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveClass('h-[200px]');
    expect(inputElement).toHaveClass('ring-var-red ring-2');
  });

  /* ref가 제대로 설정된다 */
  it('sets ref correctly', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toBeInTheDocument();
  });
});
