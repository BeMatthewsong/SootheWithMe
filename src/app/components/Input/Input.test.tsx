import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';
import '@testing-library/jest-dom';
import { createRef } from 'react';

// 아이콘 모킹
jest.mock('@/public/icons', () => ({
  IconVisivilityOff: () => <div data-testid='icon-visibility-off' />,
  IconVisivilityOn: () => <div data-testid='icon-visibility-on' />,
}));

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
    render(<Input type='password' isPassword={true} aria-label='Input' />);
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

  /* 비밀번호 인풋 기본 렌더링 */
  it('password renders correctly', () => {
    render(
      <Input type='password' isPassword={true} aria-label='PasswordInput' />,
    );

    // 입력창이 렌더링 되었는지 확인
    const inputElement = screen.getByLabelText('PasswordInput');
    expect(inputElement).toBeInTheDocument();

    // 가시성 토글 버튼이 렌더링 되었는지 확인
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    // 비밀번호 아이콘이 렌더링 되었는지 확인
    const icon = screen.getByTestId('icon-visibility-off');
    expect(icon).toBeInTheDocument();
  });

  it('changes input type on button click', () => {
    render(
      <Input type='password' isPassword={true} aria-label='PasswordInput' />,
    );

    // 초기 입력 타입이 'password'인지 확인
    const inputElement = screen.getByLabelText('PasswordInput');
    expect(inputElement).toHaveAttribute('type', 'password');

    // 버튼 클릭
    const button = screen.getByRole('button');
    fireEvent.click(button);

    // 클릭 후 입력 타입이 'text'로 변경되었는지 확인
    expect(inputElement).toHaveAttribute('type', 'text');

    // 버튼 클릭 후 아이콘이 변경되었는지 확인
    const icon = screen.getByTestId('icon-visibility-on');
    expect(icon).toBeInTheDocument();
  });
});
