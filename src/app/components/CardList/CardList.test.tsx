import React, { MouseEventHandler } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardList from './CardList';
import { GatheringType } from '@/types/data.type';

const MOCK_FIXED_DATE = '2024-10-15T15:00:00.000Z';

const MOCK_DATA_BASE: GatheringType = {
  teamId: 1,
  id: 1,
  type: 'test',
  name: '달램핏 오피스 스트레칭',
  dateTime: MOCK_FIXED_DATE,
  registrationEnd: MOCK_FIXED_DATE,
  location: 'test',
  participantCount: 10,
  capacity: 20,
  image: '/images/mock-image.png',
  createdBy: 1,
};

// 아이콘 모킹
jest.mock('@/public/icons', () => ({
  IconSaveActive: ({
    onClick,
  }: {
    onClick: MouseEventHandler<HTMLDivElement>;
  }) => <div data-testid='IconSaveActive' onClick={onClick} />,
  IconSaveInactive: ({
    onClick,
  }: {
    onClick: MouseEventHandler<HTMLDivElement>;
  }) => <div data-testid='IconSaveInactive' onClick={onClick} />,
  IconSaveDiscard: () => <div data-testid='IconSaveDiscard' />,
  IconSaveDiscardBtn: () => <div data-testid='IconSaveDiscardBtn' />,
  IconAlarm: () => <div data-testid='IconAlarm' />,
  IconArrow: () => <div data-testid='IconArrow' />,
  IconCheckCircle: () => <div data-testid='IconCheckCircle' />,
  IconPerson: () => <div data-testid='IconPerson' />,
}));

// 함수 모킹
jest.mock('@/app/(main)/gatherings/_helpers/getTagMessage', () =>
  jest.fn().mockReturnValue('오늘 15시 마감'),
);
jest.mock('@/app/(main)/gatherings/_helpers/isClosingTagVisible', () =>
  jest.fn().mockReturnValue(true),
);

// 기본 렌더링 테스트
describe('CardList Component', () => {
  const MOCK_DATA = {
    ...MOCK_DATA_BASE,
    dateTime: '2024-10-15T15:30:00',
  };
  it('should render Gatherings name', () => {
    render(<CardList data={MOCK_DATA} />);
    const titleElement = screen.getByText('달램핏 오피스 스트레칭');
    expect(titleElement).toBeInTheDocument();
  });

  it('should render `InfoChip` type `data`', () => {
    render(<CardList data={MOCK_DATA} />);
    const dateChipElement = screen.getByText('10월 15일');
    expect(dateChipElement).toBeInTheDocument();
    expect(dateChipElement).toHaveClass('text-white');
  });

  it('should render `InfoChip` type `time`', () => {
    render(<CardList data={MOCK_DATA} />);
    const timeChipElement = screen.getByText('15:30');
    expect(timeChipElement).toBeInTheDocument();
    expect(timeChipElement).toHaveClass('text-var-orange-600');
  });

  it('should render `IconSaveInActive`', () => {
    render(<CardList data={MOCK_DATA} />);
    const iconElement = screen.getByTestId('IconSaveInactive');
    expect(iconElement).toBeInTheDocument();
  });
});

// Tag 컴포넌트 렌더링 테스트 (isRenderTag)
describe('Tag Component Render', () => {
  const fixedDate = new Date('2024-10-15T00:00:00.000Z');

  beforeAll(() => {
    jest.spyOn(global, 'Date').mockImplementation(() => fixedDate);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should render Tag component when registrationEnd is same as today date', () => {
    const MOCK_DATA = {
      ...MOCK_DATA_BASE,
      registrationEnd: '2024-10-15T15:00:00.000Z',
    };

    render(<CardList data={MOCK_DATA} />);
    expect(screen.getByText(/오늘 \d{1,2}시 마감/)).toBeInTheDocument();
  });
});

// SAVED 아이콘 클릭으로 토글 테스트
describe('Saved button Test', () => {
  // dateTime을 내일 날짜로 변경 (마감되지 않은 챌린지)
  const date = new Date();
  date.setDate(date.getDate() + 1);
  const MOCK_DATA = { ...MOCK_DATA_BASE, dateTime: date.toISOString() };

  it('should toggle isSaved state when handleToggleSave is called', () => {
    const handleToggleSave = jest.fn();

    render(
      <CardList
        data={MOCK_DATA}
        isSaved={false}
        handleButtonClick={handleToggleSave}
      />,
    );

    let inactiveButton: HTMLElement | null;
    let activeButton: HTMLElement | null;

    inactiveButton = screen.getByTestId('IconSaveInactive');
    activeButton = screen.queryByTestId('IconSaveActive');

    expect(inactiveButton).toBeInTheDocument();
    expect(activeButton).not.toBeInTheDocument();

    fireEvent.click(inactiveButton);

    inactiveButton = screen.queryByTestId('IconSaveInactive');
    activeButton = screen.getByTestId('IconSaveActive');

    expect(activeButton).toBeInTheDocument();
    expect(inactiveButton).not.toBeInTheDocument();

    fireEvent.click(activeButton);

    inactiveButton = screen.getByTestId('IconSaveInactive');
    activeButton = screen.queryByTestId('IconSaveActive');

    expect(inactiveButton).toBeInTheDocument();
    expect(activeButton).not.toBeInTheDocument();
  });

  // 아이콘 클릭 시 이벤트 핸들러 작동 여부 테스트
  it('should call handleToggleSave when IconSaveInactive is clicked', () => {
    const handleToggleSave = jest.fn();
    render(<CardList data={MOCK_DATA} handleButtonClick={handleToggleSave} />);

    const inactiveButton = screen.getByTestId('IconSaveInactive');
    fireEvent.click(inactiveButton);

    expect(handleToggleSave).toHaveBeenCalled();

    const activeButton = screen.getByTestId('IconSaveActive');
    expect(activeButton).toBeInTheDocument();
  });
});

// 마감된 챌린지일 경우 (isChallengeEnded)
describe('isChallengeEnded Layer Render', () => {
  const handleToggleSave = jest.fn();

  const date = new Date();
  date.setDate(date.getDate() - 1); // 하루 전 날짜로 설정

  const MOCK_DATA = {
    ...MOCK_DATA_BASE,
    dateTime: date.toISOString(),
  };

  it('should render isChallengeEnded layer when isChallengeEnded is true', () => {
    render(<CardList data={MOCK_DATA} handleButtonClick={handleToggleSave} />);
    const challengeEndedElement = screen.getByText(/마감된 챌린지예요/);
    expect(challengeEndedElement).toBeInTheDocument();
  });

  it('should do not called handleButtonClick when IconSaveDiscardBtn is clicked and isSaved is false', () => {
    render(
      <CardList
        data={MOCK_DATA}
        isSaved={false}
        handleButtonClick={handleToggleSave}
      />,
    );
    const discardButton = screen.getByTestId('IconSaveDiscard');
    fireEvent.click(discardButton);

    expect(handleToggleSave).not.toHaveBeenCalled();
  });

  it('should called handleButtonClick when IconSaveDiscardBtn is clicked and isSaved is true', () => {
    render(
      <CardList
        data={MOCK_DATA}
        isSaved={true}
        handleButtonClick={handleToggleSave}
      />,
    );
    const discardButton = screen.getByTestId('IconSaveDiscard');
    fireEvent.click(discardButton);

    expect(handleToggleSave).toHaveBeenCalled();
  });
});
