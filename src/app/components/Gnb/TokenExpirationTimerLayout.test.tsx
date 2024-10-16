import { render, screen } from '@testing-library/react';
import TokenExpirationTimerLayout from './TokenExpirationTimerLayout';
import { TokenExpirationTimer } from '@/utils/TokenExpirationTimer';
import '@testing-library/jest-dom';

// TokenExpirationTimer 모킹
jest.mock('@/utils/TokenExpirationTimer', () => ({
  TokenExpirationTimer: jest.fn(),
}));

describe('TokenExpirationTimerLayout 컴포넌트', () => {
  const mockToken = 'test-token';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 사용자가 로그인하지 않은 경우 아무것도 렌더링하지 않아야 함
  it('should render nothing if user is not logged in', () => {
    (TokenExpirationTimer as jest.Mock).mockReturnValue({
      isLoggedIn: false,
      timeLeft: 300,
    });

    render(<TokenExpirationTimerLayout token={mockToken} variant='gnb' />);

    expect(screen.queryByText(/남은 시간:/)).not.toBeInTheDocument();
  });

  // 남은 시간이 있는 경우 남은 시간을 표시
  it('should display remaining time when user is logged in and time left is available', () => {
    (TokenExpirationTimer as jest.Mock).mockReturnValue({
      isLoggedIn: true,
      timeLeft: 120,
    });

    render(<TokenExpirationTimerLayout token={mockToken} variant='gnb' />);

    expect(screen.getByText(/남은 시간:/)).toBeInTheDocument();
    expect(screen.getByText('남은 시간: 2분 0초')).toBeInTheDocument();
  });

  // 남은 시간이 0일 경우 아무것도 렌더링하지 않아야 함
  it('should render nothing when time left is 0', () => {
    (TokenExpirationTimer as jest.Mock).mockReturnValue({
      isLoggedIn: true,
      timeLeft: 0,
    });

    render(<TokenExpirationTimerLayout token={mockToken} variant='gnb' />);

    expect(screen.queryByText(/남은 시간:/)).not.toBeInTheDocument();
  });

  // variant가 'dropdown'인 경우에도 남은 시간을 표시
  it('should display remaining time in dropdown format', () => {
    (TokenExpirationTimer as jest.Mock).mockReturnValue({
      isLoggedIn: true,
      timeLeft: 125,
    });

    render(<TokenExpirationTimerLayout token={mockToken} variant='dropdown' />);

    expect(screen.getByText('2 : 5')).toBeInTheDocument();
  });
});
