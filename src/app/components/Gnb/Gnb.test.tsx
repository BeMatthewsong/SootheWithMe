import { render, screen } from '@testing-library/react';
import Gnb from './Gnb';
import { useSavedGatheringList } from '@/context/SavedGatheringContext';
import { ReactNode } from 'react';
import { UserData } from '@/types/client.type';
import '@testing-library/jest-dom';

// 유저데이터 모킹
const mockUser: UserData = {
  id: 1,
  email: 'test@example.com',
  name: 'Test User',
  companyName: 'Test Company',
  image: '/test-image.jpg',
  createdAt: '2024-10-01T00:00:00Z',
  updatedAt: '2024-10-03T00:00:00Z',
};

// 이미지 모킹
jest.mock('@/public/images', () => ({
  Logo: () => <div data-testid='Logo' />,
}));

// TopTab 컴포넌트 모킹
jest.mock('../Tab/TopTab', () => {
  const MockTopTab = ({
    isActive,
    children,
  }: {
    isActive: boolean;
    children: ReactNode;
  }) => (
    <div
      data-testid='top-tab'
      className={isActive ? 'active text-var-gray-900' : 'text-var-orange-50'}
    >
      {children}
    </div>
  );
  MockTopTab.displayName = 'MockTopTab';
  return MockTopTab;
});

// Badge 컴포넌트 모킹
jest.mock('../Badge/Badge', () => {
  const MockBadge = ({ children }: { children: ReactNode }) => (
    <span data-testid='badge'>{children}</span>
  );
  MockBadge.displayName = 'MockBadge';
  return MockBadge;
});

// UserStatus 컴포넌트 모킹
jest.mock('./UserStatus', () => {
  const MockUserStatus = ({
    user,
    token,
  }: {
    user: UserData | null;
    token: string | undefined;
  }) => {
    return (
      <div data-testid='user-status'>
        {user ? (
          <div>
            <img src={user.image} alt='프로필 이미지' />
            <span>User: {user.name}</span>
            <span>Token: {token}</span>
          </div>
        ) : (
          <button className='text-[16px] font-semibold text-white'>
            로그인
          </button>
        )}
      </div>
    );
  };
  MockUserStatus.displayName = 'MockUserStatus';
  return MockUserStatus;
});

// ToggleTheme 컴포넌트 모킹
jest.mock('./ToggleTheme', () => {
  const MockToggleTheme = () => (
    <button data-testid='toggle-theme'>Toggle Theme</button>
  );
  MockToggleTheme.displayName = 'MockToggleTheme';
  return MockToggleTheme;
});

// TokenExpirationTimerLayout 컴포넌트 모킹
jest.mock('./TokenExpirationTimerLayout', () => {
  const MockTokenExpirationTimerLayout = () => {
    return <div>타이머</div>; // 타이머 모킹
  };
  MockTokenExpirationTimerLayout.displayName = 'MockTokenExpirationTimerLayout';
  return MockTokenExpirationTimerLayout;
});

// TokenExpirationTimerLayout 컴포넌트 모킹
jest.mock('./TokenExpirationTimerLayout', () => {
  return function MockTokenExpirationTimerLayout() {
    return <div>타이머</div>; // 타이머 모킹
  };
});

// SavedGatheringList 모킹
jest.mock('@/context/SavedGatheringContext', () => ({
  useSavedGatheringList: jest.fn(),
}));

describe('Gnb 컴포넌트 테스트', () => {
  beforeEach(() => {
    // 기본적인 Mock 설정
    (useSavedGatheringList as jest.Mock).mockReturnValue({
      savedGatherings: [],
    });
    render(<Gnb user={mockUser} token='mocktoken' />);
  });

  // 토글 테마 버튼 렌더링
  it('should render the toggle theme button', () => {
    expect(screen.getByTestId('toggle-theme')).toBeInTheDocument();
  });

  // 사용자가 로그인하지 않았을 때 로그인 버튼 렌더링
  it('should render the login button when user is not logged in', () => {
    render(<Gnb user={null} token={undefined} />);

    expect(screen.getByRole('button', { name: '로그인' })).toBeInTheDocument();
  });

  // 사용자가 로그인했을 때 프로필 이미지와 타이머 렌더링
  it('should render the profile image and timer when user is logged in', () => {
    expect(
      screen.getByRole('img', { name: '프로필 이미지' }),
    ).toBeInTheDocument();
    expect(screen.getByText('타이머')).toBeInTheDocument();
  });

  // 찜한 모임의 개수가 1개 이상일 때 배지 렌더링
  it('should render the badge when there is one or more saved gatherings', () => {
    (useSavedGatheringList as jest.Mock).mockReturnValue({
      savedGatherings: [{ id: 1 }, { id: 2 }], // 찜한 모임이 2개인 경우
    });

    render(<Gnb user={null} token={undefined} />);

    expect(screen.getByTestId('badge')).toHaveTextContent('2');
  });

  // 찜한 모임의 개수가 0일 때 배지 렌더링 안됨
  it('should not render the badge when there are no saved gatherings', () => {
    expect(screen.queryByTestId('badge')).not.toBeInTheDocument();
  });
});
