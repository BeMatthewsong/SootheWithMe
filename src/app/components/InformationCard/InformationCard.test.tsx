import { useParams } from 'next/navigation'; // useParams 모킹

import { SavedGatheringProvider } from '@/context/SavedGatheringContext';
import InformationCard from './InformationCard';

import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';

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

// useParams Mocking
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

// mock data
const MOCK_PARTICIPANTS = [
  {
    teamId: 1,
    userId: 1,
    gatheringId: 1,
    joinedAt: '2024-09-19T14:00:00Z',
    User: {
      id: 1,
      email: 'alice@example.com',
      name: 'Alice',
      companyName: 'Company A',
      image: '/images/mock-image.png',
    },
  },
  {
    teamId: 2,
    userId: 2,
    gatheringId: 1,
    joinedAt: '2024-09-19T14:00:00Z',
    User: {
      id: 2,
      email: 'bob@example.com',
      name: 'Bob',
      companyName: 'Company B',
      image: '/images/mock-image.png',
    },
  },
  {
    teamId: 3,
    userId: 3,
    gatheringId: 1,
    joinedAt: '2024-09-19T14:00:00Z',
    User: {
      id: 3,
      email: 'alice@example.com',
      name: 'Alice',
      companyName: 'Company A',
      image: '/images/mock-image.png',
    },
  },
  {
    teamId: 4,
    userId: 4,
    gatheringId: 1,
    joinedAt: '2024-09-19T14:00:00Z',
    User: {
      id: 4,
      email: 'bob@example.com',
      name: 'Bob',
      companyName: 'Company B',
      image: '/images/mock-image.png',
    },
  },
  {
    teamId: 5,
    userId: 5,
    gatheringId: 1,
    joinedAt: '2024-09-19T14:00:00Z',
    User: {
      id: 5,
      email: 'charlie@example.com',
      name: 'Charlie',
      companyName: 'Company C',
      image: '/images/mock-image.png',
    },
  },
  {
    teamId: 6,
    userId: 6,
    gatheringId: 1,
    joinedAt: '2024-09-19T14:00:00Z',
    User: {
      id: 6,
      email: 'david@example.com',
      name: 'David',
      companyName: 'Company D',
      image: '/images/mock-image.png',
    },
  },
  {
    teamId: 7,
    userId: 7,
    gatheringId: 1,
    joinedAt: '2024-09-19T14:00:00Z',
    User: {
      id: 7,
      email: 'eve@example.com',
      name: 'Eve',
      companyName: 'Company E',
      image: '/images/mock-image.png',
    },
  },
];

describe('InformationCard', () => {
  beforeEach(() => {
    // useParams가 특정 값을 반환하도록 설정
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
  });

  const defaultProps = {
    title: 'Sample Gathering',
    address: '123 Main St',
    date: '2024-10-01',
    time: '12:00',
    participants: MOCK_PARTICIPANTS,
    participantCount: MOCK_PARTICIPANTS.length,
    maxParticipants: 10,
  };

  it('renders InformationCard with correct data', () => {
    const { getByTestId } = render(
      <SavedGatheringProvider>
        <InformationCard {...defaultProps} />
      </SavedGatheringProvider>,
    );

    expect(getByTestId('title')).toHaveTextContent(defaultProps.title);
    expect(getByTestId('address')).toHaveTextContent(defaultProps.address);
  });

  it('toggles save state when save button is clicked', () => {
    const { getByTestId } = render(
      <SavedGatheringProvider>
        <InformationCard {...defaultProps} />
      </SavedGatheringProvider>,
    );

    expect(getByTestId('save-inactive')).toBeInTheDocument();

    fireEvent.click(getByTestId('save-inactive'));
    expect(getByTestId('save-active')).toBeInTheDocument();

    fireEvent.click(getByTestId('save-active'));
    expect(getByTestId('save-inactive')).toBeInTheDocument();
  });

  it('displays additional avatars when participant count exceeds visible limit', () => {
    const participantsWithExcess = [
      ...MOCK_PARTICIPANTS,
      {
        teamId: 8,
        userId: 8,
        gatheringId: 1,
        joinedAt: '2024-09-19T14:00:00Z',
        User: {
          id: 8,
          email: 'frank@example.com',
          name: 'Frank',
          companyName: 'Company F',
          image: '/images/mock-image.png',
        },
      },
    ];

    const { getByText } = render(
      <SavedGatheringProvider>
        <InformationCard
          {...defaultProps}
          participants={participantsWithExcess}
          participantCount={participantsWithExcess.length}
        />
      </SavedGatheringProvider>,
    );

    expect(getByText('+4')).toBeInTheDocument();
  });

  it('displays check circle icon when participant count exceeds minimum required', () => {
    const { getByTestId } = render(
      <SavedGatheringProvider>
        <InformationCard {...defaultProps} participantCount={6} />
      </SavedGatheringProvider>,
    );

    expect(getByTestId('check-circle')).toBeInTheDocument();
  });
});
