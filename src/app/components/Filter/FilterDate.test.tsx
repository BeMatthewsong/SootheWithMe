import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterDate from './FilterDate';
import { formatDate } from '@/utils/formatDate';

// 아이콘 모킹
jest.mock('@/public/icons', () => ({
  IconCaret: () => <div data-testid='IconCaret' />,
}));

// CalendarModal 모킹
jest.mock('../Modal/CalendarModal', () => {
  return function CalendarModal(props: {
    initialSelectedData: Date | null;
    handleClickButtons: (date?: Date) => void;
  }) {
    let selectedDate = props.initialSelectedData;

    return (
      <div data-testid='calendar-modal'>
        <input
          type='date'
          data-testid='date-input'
          value={selectedDate ? selectedDate.toISOString().slice(0, 10) : ''}
          onChange={(e) => {
            selectedDate = new Date(e.target.value);
          }}
        />
        <button onClick={() => props.handleClickButtons()}>초기화</button>
        <button
          onClick={() => selectedDate && props.handleClickButtons(selectedDate)}
        >
          적용
        </button>
      </div>
    );
  };
});

describe('FilterDate Component Test', () => {
  beforeEach(() => {
    render(<FilterDate state='default'>날짜 선택</FilterDate>);
  });

  // 기본 렌더링 확인
  it('should render FilterDate Component', () => {
    const filterElement = screen.getByTestId('filterDate');
    const iconElement = screen.getByTestId('IconCaret');

    expect(filterElement).toBeInTheDocument();
    expect(filterElement).toHaveTextContent('날짜 선택');
    expect(iconElement).toBeInTheDocument();
  });

  // 날짜 선택을 누르면 모달이 보이는지 확인
  it('toggles dropdown visibility based on isOpen state', () => {
    const filterElement = screen.getByText('날짜 선택');

    fireEvent.click(filterElement);

    const modalWrapper = screen.getByTestId('calendar-modal-wrapper');

    expect(modalWrapper).toHaveStyle('visibility: visible');
    expect(modalWrapper).not.toHaveClass('pointer-events-none');
  });

  // 초기화 버튼 클릭 시 상태 업데이트 확인
  it('clears the date and updates state', () => {
    const filterElement = screen.getByTestId('filterDate');
    fireEvent.click(filterElement);

    const dateInput = screen.getByTestId('date-input');
    const dateStr = new Date().toISOString().slice(0, 10);
    fireEvent.change(dateInput, { target: { value: dateStr } });

    // '적용' 버튼 클릭
    const applyButton = screen.getByText('적용');
    fireEvent.click(applyButton);
    expect(filterElement).toHaveTextContent(formatDate(dateStr));

    fireEvent.click(filterElement);

    // '초기화' 버튼 클릭
    const clearButton = screen.getByText('초기화');
    fireEvent.click(clearButton);

    // state 확인
    expect(filterElement).toHaveClass(
      'border border-var-gray-100 bg-var-gray-50 text-var-gray-800',
    );
    // 텍스트 변경 확인
    expect(filterElement).toHaveTextContent('날짜 선택');
    // 모달이 열려 있는지 확인
    expect(screen.queryByTestId('calendar-modal')).toBeInTheDocument();
  });
});
