import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './Card';
import { formatDate, formatTime } from '@/utils/formatDate';

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

const handleSaveDiscard = jest.fn();

// 기본 카드 컴포넌트 렌더링
describe('Basic Card Component Render Test', () => {
  beforeEach(() => {
    render(
      <Card handleSaveDiscard={handleSaveDiscard} data={MOCK_DATA_BASE}>
        <Card.Info />
      </Card>,
    );
  });

  it('renders Card component with Info', () => {
    const elements = [
      screen.getByText(MOCK_DATA_BASE.name),
      screen.getByText(MOCK_DATA_BASE.location),
      screen.getByText(formatDate(MOCK_DATA_BASE.dateTime)),
      screen.getByText(formatTime(MOCK_DATA_BASE.dateTime)),
      screen.getByTestId('IconPerson'),
      screen.getByText(
        `${MOCK_DATA_BASE.participantCount}/${MOCK_DATA_BASE.capacity}`,
      ),
    ];

    elements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  // 버튼이 없는지 확인
  it('renders Card component without Button', () => {
    const button = screen.queryByRole('button');
    expect(button).not.toBeInTheDocument();
  });

  // chips 이 없는지 확인
  it('renders Card component without StateChips', () => {
    const chipsText = ['이용 완료', '이용 예정', '개설 확정', '개설 대기'];

    chipsText.forEach((text) => {
      expect(screen.queryByText(text)).not.toBeInTheDocument();
    });
  });
});

// Chips
describe('Card Component with Chips and Info Render Test', () => {
  // isCompleted 가 true 일 때 이용 완료 chip 이 렌더링 되는지 확인
  it('Chip state=`done` render Test', () => {
    const MOCK_DATA = {
      ...MOCK_DATA_BASE,
      isCompleted: true,
    };
    render(
      <Card handleSaveDiscard={handleSaveDiscard} data={MOCK_DATA}>
        <Card.Chips />
        <Card.Info />
      </Card>,
    );

    expect(screen.getByText('이용 완료')).toBeInTheDocument();
    expect(screen.queryByText('이용 예정')).not.toBeInTheDocument();
    expect(screen.queryByText('개설 확정')).not.toBeInTheDocument();
    expect(screen.queryByText('개설 대기')).not.toBeInTheDocument();
  });

  // isCompleted 가 false 일 때 이용 예정 chip 이 렌더링 되는지 확인
  it('Chip state=`scheduled` render Test', () => {
    const MOCK_DATA = {
      ...MOCK_DATA_BASE,
      isCompleted: false,
    };
    render(
      <Card handleSaveDiscard={handleSaveDiscard} data={MOCK_DATA}>
        <Card.Chips />
        <Card.Info />
      </Card>,
    );

    expect(screen.getByText('이용 예정')).toBeInTheDocument();
    expect(screen.queryByText('이용 완료')).not.toBeInTheDocument();
  });

  // isCompleted 가 false 일 때, 참가 인원 수에 따라 개설 상태에 대한 chip 이 렌더링 되는지 확인
  const MIN_PARTICIPANTS = 5;
  const testCases = [2, 3, 5, 10, 15];

  it.each(testCases)(
    'Chip state=`scheduled` render Test with participantCount=%i',
    (participantCount) => {
      const MOCK_DATA = {
        ...MOCK_DATA_BASE,
        isCompleted: false,
        participantCount: participantCount,
      };

      render(
        <Card handleSaveDiscard={handleSaveDiscard} data={MOCK_DATA}>
          <Card.Chips />
          <Card.Info />
        </Card>,
      );

      if (participantCount >= MIN_PARTICIPANTS) {
        expect(screen.getByText('개설 확정')).toBeInTheDocument();
        expect(screen.queryByText('개설 대기')).not.toBeInTheDocument();
      } else {
        expect(screen.getByText('개설 대기')).toBeInTheDocument();
        expect(screen.queryByText('개설 확정')).not.toBeInTheDocument();
      }
    },
  );
});

// Button
describe('Card Component with Button Render Test', () => {
  const handleWriteReview = jest.fn();
  const handleCancelGatherings = jest.fn();

  it('Button State when data.isCompleted=`false` & data.isReviewed=`false` ', () => {
    const MOCK_DATA = {
      ...MOCK_DATA_BASE,
      isCompleted: false,
      isReviewed: false,
    };
    render(
      <Card handleSaveDiscard={handleSaveDiscard} data={MOCK_DATA}>
        <Card.Info />
        <Card.Button
          handleButtonClick={
            MOCK_DATA.isCompleted ? handleWriteReview : handleCancelGatherings
          }
        />
      </Card>,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('예약 취소하기');
    fireEvent.click(button);
    expect(handleCancelGatherings).toHaveBeenCalled();
  });

  it('Button State when data.isCompleted=`true` & data.isReviewed=`false` ', () => {
    const MOCK_DATA = {
      ...MOCK_DATA_BASE,
      isCompleted: true,
      isReviewed: false,
    };
    render(
      <Card handleSaveDiscard={handleSaveDiscard} data={MOCK_DATA}>
        <Card.Info />
        <Card.Button
          handleButtonClick={
            MOCK_DATA.isCompleted ? handleWriteReview : handleCancelGatherings
          }
        />
      </Card>,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('리뷰 작성하기');
    fireEvent.click(button);
    expect(handleWriteReview).toHaveBeenCalled();
  });

  // 데이터 상태에 따라 버튼이 렌더링 되지 않음
  it('not Render when data.isCompleted=`true` & data.isReviewed=`true` ', () => {
    const MOCK_DATA = {
      ...MOCK_DATA_BASE,
      isCompleted: true,
      isReviewed: true,
    };
    render(
      <Card handleSaveDiscard={handleSaveDiscard} data={MOCK_DATA}>
        <Card.Info />
        <Card.Button
          handleButtonClick={
            MOCK_DATA.isCompleted ? handleWriteReview : handleCancelGatherings
          }
        />
      </Card>,
    );

    const button = screen.queryByRole('button');
    expect(button).not.toBeInTheDocument();
  });
});

//취소된 모임일 경우
describe('Card Component with Canceled Gathering Render Test', () => {
  const MOCK_DATA = {
    ...MOCK_DATA_BASE,
    canceledAt: new Date().toISOString(),
  };

  it('Canceled overlay Render Test', () => {
    render(
      <Card handleSaveDiscard={handleSaveDiscard} data={MOCK_DATA}>
        <Card.Info />
      </Card>,
    );

    expect(screen.getByTestId('IconSaveDiscard')).toBeInTheDocument();
    expect(screen.getByText(/모집 취소된 모임이에요/i)).toBeInTheDocument();
  });

  // 버튼 클릭 시 함수 호출 테스트
  it('Canceled overlay Button Click Test', () => {
    render(
      <Card handleSaveDiscard={handleSaveDiscard} data={MOCK_DATA}>
        <Card.Info />
      </Card>,
    );

    const button = screen.getByTestId('save-discard-button');
    fireEvent.click(button);
    expect(handleSaveDiscard).toHaveBeenCalled();
  });
});
