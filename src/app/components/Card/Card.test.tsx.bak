import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './Card';

const MOCK_DATA_BASE = {
  teamId: 1,
  id: 1,
  type: 'test',
  name: '달램핏 오피스 스트레칭',
  dateTime: '2024-09-15T00:00:00',
  registrationEnd: '2024-09-15T00:00:00',
  location: 'test',
  participantCount: 10,
  capacity: 20,
  image: '/images/mock-image.png',
  createdBy: 1,
  joinedAt: '2024-09-15T00:00:00',
  isCompleted: true,
  isReviewed: true,
};

// 아이콘 모킹
jest.mock('@/public/icons', () => ({
  IconCheck: () => <div data-testid='IconCheck' />,
  IconPerson: () => <div data-testid='IconPerson' />,
  IconSaveDiscard: () => <div data-testid='IconSaveDiscard' />,
  IconSaveDiscardBtn: () => <div data-testid='IconSaveDiscardBtn' />,
}));

// 기본 카드 컴포넌트 렌더링
describe('Basic Card Component Render Test', () => {
  // {data.name} 출력 확인
  test('renders Card component with title', () => {
    render(<Card data={MOCK_DATA_BASE} />);
    const titleElement = screen.getByText('달램핏 오피스 스트레칭');
    expect(titleElement).toBeInTheDocument();
  });
});

// 완료되지 않은 모임일 경우
describe('Uncompleted getherings ', () => {
  const MOCK_DATA = {
    ...MOCK_DATA_BASE,
    isCompleted: false,
    isReviewed: false,
  };

  const handleCancelGatherings = jest.fn();

  beforeEach(() => {
    render(
      <Card
        data={MOCK_DATA}
        hasButton={true}
        handleCancelGatherings={handleCancelGatherings}
      />,
    );
  });

  // 예약 취소하기 버튼 렌더링 확인
  test('renders Card component with Cancle button', () => {
    const cancelButtonElement = screen.getByText('예약 취소하기');
    expect(cancelButtonElement).toBeInTheDocument();
  });

  // 예약 취소하기 버튼 클릭 시 handleCancelGatherings 함수 호출 확인
  test('calls handleCancelGatherings function when cancel button is clicked', () => {
    const cancelButtonElement = screen.getByText('예약 취소하기');
    fireEvent.click(cancelButtonElement);
    expect(handleCancelGatherings).toBeCalled();
  });
});

// 리뷰를 작성하지 않은 모임
describe('Getherings with no review written', () => {
  const MOCK_DATA = {
    ...MOCK_DATA_BASE,
    isCompleted: true,
    isReviewed: false,
  };

  const handleWriteReview = jest.fn();

  beforeEach(() => {
    render(
      <Card
        data={MOCK_DATA}
        hasButton={true}
        handleWriteReview={handleWriteReview}
      />,
    );
  });

  // 리뷰 작성하기 버튼 렌더링 확인
  test('renders Card component with Write review button', () => {
    const reviewButtonElement = screen.getByText('리뷰 작성하기');
    expect(reviewButtonElement).toBeInTheDocument();
  });

  // 리뷰 작성하기 버튼 클릭 시 handleWriteReview 함수 호출 확인
  test('calls handleWriteReview function when review button is clicked', () => {
    const reviewButtonElement = screen.getByText('리뷰 작성하기');
    fireEvent.click(reviewButtonElement);
    expect(handleWriteReview).toBeCalled();
  });
});

// hasChips가 true인 경우
describe('Getherings with chips', () => {
  test('chip state is `done`', () => {
    render(<Card data={MOCK_DATA_BASE} hasChips={true} />);
    const stateChipElement = screen.getByText('이용 완료');
    expect(stateChipElement).toBeInTheDocument();
  });

  test('When `participantCount` is less than 5, chip state is `scheduled` and `pending`', () => {
    const MOCK_DATA = {
      ...MOCK_DATA_BASE,
      isCompleted: false,
      participantCount: 2,
    };

    render(<Card data={MOCK_DATA} hasChips={true} />);
    const stateChipElement1 = screen.getByText('이용 예정');
    const stateChipElement2 = screen.getByText('개설 대기');
    expect(stateChipElement1).toBeInTheDocument();
    expect(stateChipElement2).toBeInTheDocument();
  });

  const testCases = [
    { participantCount: 5 },
    { participantCount: 10 },
    { participantCount: 20 },
  ];

  test.each(testCases)(
    'When `participantCount` is %i, chip state is `scheduled` and `confirmed`',
    ({ participantCount }) => {
      const MOCK_DATA = {
        ...MOCK_DATA_BASE,
        isCompleted: false,
        participantCount,
      };

      render(<Card data={MOCK_DATA} hasChips={true} />);
      const stateChipElement1 = screen.getByText('이용 예정');
      const stateChipElement2 = screen.getByText('개설 확정');
      expect(stateChipElement1).toBeInTheDocument();
      expect(stateChipElement2).toBeInTheDocument();
    },
  );
});

// 취소된 모임의 경우
describe('Cancled getherings', () => {
  const MOCK_DATA = {
    ...MOCK_DATA_BASE,
    canceledAt: '2024-09-15T00:00:00',
  };

  const handleSaveDiscard = jest.fn();
  beforeEach(() => {
    render(<Card data={MOCK_DATA} handleSaveDiscard={handleSaveDiscard} />);
  });

  // 모임 보내주기 버튼이 렌더링 되는지 확인
  test('renders Card component with save discard button', () => {
    const button = screen.getByTestId('save-discard-button');
    expect(button).toBeInTheDocument();
  });

  // 모임 보내주기 버튼 클릭 시 handleSaveDiscard 함수 호출 확인
  test('calls handleSaveDiscard function when save discard button is clicked', () => {
    const button = screen.getByTestId('save-discard-button');

    fireEvent.click(button);
    expect(handleSaveDiscard).toHaveBeenCalled();
  });
});
