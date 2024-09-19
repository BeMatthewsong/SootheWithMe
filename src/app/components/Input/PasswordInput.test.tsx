// PasswordInput.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import PasswordInput from './PasswordInput';
import '@testing-library/jest-dom';

// 아이콘 모킹
jest.mock('@/public/icons', () => ({
  IconVisivilityOff: () => <div data-testid='icon-visibility-off' />,
  IconVisivilityOn: () => <div data-testid='icon-visibility-on' />,
}));

describe('PasswordInput', () => {
  /* 기본 렌더링 */
  it('renders correctly', () => {
    render(<PasswordInput aria-label='PasswordInput' />);

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

  /* 버튼 클릭 시 입력 타입이 변경되는지 확인 */
  it('changes input type on button click', () => {
    render(<PasswordInput aria-label='PasswordInput' />);

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
