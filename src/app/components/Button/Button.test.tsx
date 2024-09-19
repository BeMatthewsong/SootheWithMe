import Button from './Button';

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Button component', () => {
  // 기본 props로 렌더링되는지 확인합니다.
  it('should render with default props', () => {
    render(<Button name='Default Button' variant='default' />);

    const button = screen.getByRole('button', { name: /Default Button/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-var-orange-600 text-var-white');
  });

  // 각각의 variant에 맞는 올바른 클래스를 적용하는지 확인합니다.
  const variants = ['default', 'white', 'gray', 'grayOutline'] as const;

  variants.forEach((variant) => {
    it(`should apply correct classes for ${variant} variant`, () => {
      render(<Button name='Test Button' variant={variant} />);

      const buttonElement = screen.getByRole('button', { name: 'Test Button' });

      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveClass(
        `flex w-full items-center justify-center`,
      );
    });
  });

  // 클릭 시 onClick 핸들러가 호출되는지 확인합니다.
  it('should call onClick handler when clicked', () => {
    const handleClick = jest.fn();

    render(<Button name='Click' variant='default' onClick={handleClick} />);

    const button = screen.getByRole('button', { name: /Click/i });

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // type 속성이 올바르게 적용되는지 확인합니다.
  const types = ['button', 'submit', 'reset'] as const;

  types.forEach((type) => {
    test(`should apply the correct type attribute for "${type}"`, () => {
      render(
        <Button name={`${type} Test Button`} variant='default' type={type} />,
      );

      const button = screen.getByRole('button', {
        name: `${type} Test Button`,
      });

      expect(button).toHaveAttribute('type', type);
    });
  });

  // disabled가 true일 때 버튼이 비활성화되는지 확인합니다.
  it('should be disabled when the disabled prop is true', () => {
    render(<Button name='Disabled' variant='gray' disabled />);

    const button = screen.getByRole('button', { name: /Disabled/i });

    expect(button).toBeDisabled();
    expect(button).toHaveClass('cursor-not-allowed opacity-50');
  });

  // 버튼이 비활성화된 상태로 렌더링 되는지 확인합니다.
  it('should render as a disabled button', () => {
    render(<Button name='Disabled Button' disabled variant='default' />);

    const buttonElement = screen.getByRole('button', {
      name: 'Disabled Button',
    });

    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveClass('cursor-not-allowed opacity-50');
  });

  // onClick 핸들러 없이 버튼 클릭 시 오류 없이 동작하는지 확인합니다.
  it('should work without an onClick handler when clicked', () => {
    render(<Button name='Button without Click' variant='default' />);

    const buttonElement = screen.getByRole('button', {
      name: 'Button without Click',
    });

    fireEvent.click(buttonElement);

    expect(buttonElement).toBeInTheDocument();
  });

  // 잘못된 variant prop을 전달했을 때 기본 동작을 확인합니다.
  it('should default to the correct behavior with an invalid variant prop', () => {
    render(<Button name='Invalid Variant' variant={'invalid' as any} />);

    const buttonElement = screen.getByRole('button', {
      name: 'Invalid Variant',
    });

    expect(buttonElement).toHaveClass('bg-var-orange-600');
  });
});
