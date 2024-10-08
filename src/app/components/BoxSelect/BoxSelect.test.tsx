import BoxSelect from './BoxSelect';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('BoxSelect Component Test', () => {
  // 기본 렌더링 확인
  it('should render BoxSelect Component', () => {
    render(<BoxSelect title='제목' isSelected={false} onChange={() => {}} />);

    const boxSelectElement = screen.getByTestId('box-select');

    expect(boxSelectElement).toBeInTheDocument();
  });

  // 선택 시 색상 변경 확인
  it('should change color when selected', () => {
    render(<BoxSelect title='제목' isSelected={true} onChange={() => {}} />);

    const boxSelectElement = screen.getByTestId('box-select');
    fireEvent.click(boxSelectElement);

    expect(boxSelectElement).toHaveClass('bg-var-gray-900 text-var-white');
  });
});
