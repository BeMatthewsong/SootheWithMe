import InformationCard from './InformationCard';

import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

// ProgressBar Mocking
jest.mock('../ProgressBar/ProgressBar', () => {
  return function DummyProgressBar() {
    return <div data-testid='progress-bar' />;
  };
});

// Avatar mocking
jest.mock('./Avatar', () => {
  return function DummyAvatar({ name }: { name: string }) {
    return <div data-testid='avatar'>{name}</div>;
  };
});

// Icon Mocking
jest.mock('@/public/icons', () => ({
  IconCheckCircle: () => <div data-testid='check-circle' />,
  IconSaveActive: ({ onClick }: { onClick: () => void }) => (
    <div data-testid='save-active' onClick={onClick} />
  ),
  IconSaveInactive: ({ onClick }: { onClick: () => void }) => (
    <div data-testid='save-inactive' onClick={onClick} />
  ),
}));

// mock data
const MOCK_PARTICIPANTS = [
  { id: 1, name: 'Alice', image: '/images/mock-image.png' },
  { id: 2, name: 'Bob', image: '/images/mock-image.png' },
];

describe('InformationCard', () => {
  const defaultProps = {
    title: '테스트 타이틀',
    address: '테스트 주소',
    date: '2024-09-19',
    time: '14:00',
    participants: MOCK_PARTICIPANTS,
    maxParticipants: 10,
  };

  // 기본 렌더링 확인
  it('should render basic information correctly', () => {
    render(<InformationCard {...defaultProps} />);

    expect(screen.getByText('테스트 타이틀')).toBeInTheDocument();
    expect(screen.getByText('테스트 주소')).toBeInTheDocument();
    expect(screen.getByText('2024-09-19')).toBeInTheDocument();
    expect(screen.getByText('14:00')).toBeInTheDocument();
    expect(screen.getByText('모집 정원 2명')).toBeInTheDocument();
    expect(screen.getByTestId('progress-bar')).toBeInTheDocument();
    expect(screen.getAllByTestId('avatar')).toHaveLength(2);
  });

  // 찜 기능 제대로 작동하는지 확인
  it('should render save icon and allow toggling between active and inactive states', () => {
    render(<InformationCard {...defaultProps} />);

    const saveInactiveIcon = screen.getByTestId('save-inactive');

    expect(saveInactiveIcon).toBeInTheDocument();

    fireEvent.click(saveInactiveIcon);
    expect(screen.getByTestId('save-active')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('save-active'));
    expect(screen.getByTestId('save-inactive')).toBeInTheDocument();
  });

  // 모집 정원에 맞는 인원들이 제대로 표시되는지 확인
  it('should render correct number of participants and avatars', () => {
    render(<InformationCard {...defaultProps} />);

    expect(screen.getAllByTestId('avatar')).toHaveLength(2);
    expect(screen.getByText('모집 정원 2명')).toBeInTheDocument();
  });

  // 모집 정원이 4명인 경우 확인
  it('should display participant count as 4 when there are 4 participants', () => {
    const props = {
      ...defaultProps,
      participants: [
        { id: 1, name: 'Alice', image: '/images/mock-image.png' },
        { id: 2, name: 'Bob', image: '/images/mock-image.png' },
        { id: 3, name: 'Charlie', image: '/images/mock-image.png' },
        { id: 4, name: 'David', image: '/images/mock-image.png' },
      ],
    };

    render(<InformationCard {...props} />);

    expect(screen.getByText('모집 정원 4명')).toBeInTheDocument();
  });

  // 참가 인원이 5명인 경우 +1 이 표시되는지 확인
  it('should display "+1" when there are more than 4 participants', () => {
    const props = {
      ...defaultProps,
      participants: [
        { id: 1, name: 'Alice', image: '/images/mock-image.png' },
        { id: 2, name: 'Bob', image: '/images/mock-image.png' },
        { id: 3, name: 'Charlie', image: '/images/mock-image.png' },
        { id: 4, name: 'David', image: '/images/mock-image.png' },
        { id: 5, name: 'Eve', image: '/images/mock-image.png' },
      ],
    };

    render(<InformationCard {...props} />);

    expect(screen.getByText('+1')).toBeInTheDocument();
  });

  // 모집 정원이 5명인 경우 개설확정 텍스트가 나타나는지 확인
  it('should display "개설확정" when there are 5 participants', () => {
    const props = {
      ...defaultProps,
      participants: [
        { id: 1, name: 'Alice', image: '/images/mock-image.png' },
        { id: 2, name: 'Bob', image: '/images/mock-image.png' },
        { id: 3, name: 'Charlie', image: '/images/mock-image.png' },
        { id: 4, name: 'David', image: '/images/mock-image.png' },
        { id: 5, name: 'Eve', image: '/images/mock-image.png' },
      ],
    };

    render(<InformationCard {...props} />);

    expect(screen.getByText('모집 정원 5명')).toBeInTheDocument();
    expect(screen.getByText('개설확정')).toBeInTheDocument();
  });

  // 모집 정원이 없을 때 제대로 표시되는지 확인
  it('should handle case when there are no participants', () => {
    const propsWithNoParticipants = {
      ...defaultProps,
      participants: [],
    };

    render(<InformationCard {...propsWithNoParticipants} />);

    expect(screen.getByText('모집 정원 0명')).toBeInTheDocument();
  });

  // 최소 인원 충족 시 check-circle 이 표시되는지 확인
  it('should render check circle icon if participants meet the minimum requirement', () => {
    const propsWithEnoughParticipants = {
      ...defaultProps,
      participants: [
        ...MOCK_PARTICIPANTS,
        { id: 3, name: 'Charlie', image: '/images/mock-image.png' },
        { id: 4, name: 'Dana', image: '/images/mock-image.png' },
        { id: 5, name: 'Eve', image: '/images/mock-image.png' },
      ],
    };

    render(<InformationCard {...propsWithEnoughParticipants} />);

    expect(screen.getByTestId('check-circle')).toBeInTheDocument();
  });

  // 최소 인원 미 충족 시 check-circle 이 표시되지 않는지 확인
  it('should not render check circle icon if participants are less than the minimum requirement', () => {
    render(<InformationCard {...defaultProps} />);

    expect(screen.queryByTestId('check-circle')).not.toBeInTheDocument();
  });
});
