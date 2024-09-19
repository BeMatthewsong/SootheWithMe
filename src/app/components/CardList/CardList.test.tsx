import React, { MouseEventHandler } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardList from './CardList';
import { GatheringsListData } from '@/types/data.type';

const date = new Date();
date.setDate(date.getDate() + 3);

const MOCK_DATA_BASE: GatheringsListData = {
  teamId: 1,
  id: 1,
  type: 'test',
  name: '달램핏 오피스 스트레칭',
  dateTime: date.toISOString(),
  registrationEnd: date.toISOString(),
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

// 기본 렌더링 테스트
describe('CardList Component', () => {
  const MOCK_DATA = {
    ...MOCK_DATA_BASE,
    dateTime: '2024-09-15T15:30:00',
  };
  it('should render Gatherings name', () => {
    render(<CardList data={MOCK_DATA} />);
    const titleElement = screen.getByText('달램핏 오피스 스트레칭');
    expect(titleElement).toBeInTheDocument();
  });

  it('should render `InfoChip` type `data`', () => {
    render(<CardList data={MOCK_DATA} />);
    const dateChipElement = screen.getByText('9월 15일');
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
  it('should render Tag component when registrationEnd is same as today date', () => {
    const date = new Date();
    date.setHours(15, 0, 0, 0);

    const MOCK_DATA = {
      ...MOCK_DATA_BASE,
      registrationEnd: date.toISOString(),
    };

    render(<CardList data={MOCK_DATA} />);
    const tagElement = screen.getByText('오늘 15시 마감');
    expect(tagElement).toBeInTheDocument();
  });

  it('should NOT render Tag component when registrationEnd is NOT same as today date', () => {
    render(<CardList data={MOCK_DATA_BASE} />);
    const tagElement = screen.queryByText(/시 마감/);
    expect(tagElement).not.toBeInTheDocument();
  });
});

// 마감된 챌린지일 경우 (isChallengeEnded)
describe('isChallengeEnded Layer Render', () => {
  beforeEach(() => {
    const date = new Date();
    date.setDate(date.getDate() - 1); // 하루 전 날짜로 설정

    const MOCK_DATA = {
      ...MOCK_DATA_BASE,
      dateTime: date.toISOString(),
    };

    render(<CardList data={MOCK_DATA} />);
  });

  it('should render isChallengeEnded layer when isChallengeEnded is true', () => {
    const challengeEndedElement = screen.getByText(/마감된 챌린지예요/);
    expect(challengeEndedElement).toBeInTheDocument();
  });
});

// SAVED 아이콘 클릭으로 토글 테스트
describe('Saved button Test', () => {
  it('should toggle isSaved state when handleToggleSave is called', () => {
    render(<CardList data={MOCK_DATA_BASE} />);

    let inactiveButton: HTMLElement | null;
    let activeButton: HTMLElement | null;

    inactiveButton = screen.getByTestId('IconSaveInactive');
    activeButton = screen.queryByTestId('IconSaveActive');

    // 초기 상태 - (inactive 아이콘 확인)
    expect(inactiveButton).toBeInTheDocument();
    expect(activeButton).not.toBeInTheDocument();

    // 버튼 클릭하여 상태 변경
    fireEvent.click(inactiveButton);

    // 아이콘이 변경되었는지 확인 (actove 아이콘 확인)
    inactiveButton = screen.queryByTestId('IconSaveInactive');
    activeButton = screen.getByTestId('IconSaveActive');

    expect(activeButton).toBeInTheDocument();
    expect(inactiveButton).not.toBeInTheDocument();

    // 버튼 클릭하여 상태 변경
    fireEvent.click(activeButton);

    inactiveButton = screen.getByTestId('IconSaveInactive');
    activeButton = screen.queryByTestId('IconSaveActive');

    // 초기와 같은 상태 (inactive 아이콘 확인)
    expect(inactiveButton).toBeInTheDocument();
    expect(activeButton).not.toBeInTheDocument();
  });
});
