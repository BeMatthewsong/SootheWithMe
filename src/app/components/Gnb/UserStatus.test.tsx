import { render, screen, fireEvent } from '@testing-library/react';
import UserStatus from './UserStatus';
import { useRouter } from 'next/navigation';
import { deleteCookie } from '@/app/api/actions/cookie/cookie';
import { postUserLogoutData } from '@/app/api/actions/mypage/postUserLogoutData';
import toast from 'react-hot-toast';
import { UserData } from '@/types/client.type';
import '@testing-library/jest-dom';

const mockToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWFtSWQiOiIzLTQiLCJ1c2VySWQiOjcyMSwiaWF0IjoxNzI5MDYyODQ2LCJleHAiOjE3MjkwNjY0NDZ9.w4T2gz1nLLTN52UJBSxuy-LAvZI3zYTKKEQfdpmCngc';

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

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/app/api/actions/cookie/cookie', () => ({
  deleteCookie: jest.fn(),
}));

jest.mock('@/app/api/actions/mypage/postUserLogoutData', () => ({
  postUserLogoutData: jest.fn(),
}));

jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

describe('UserStatus 컴포넌트', () => {
  const mockPush = jest.fn();
  const mockPostUserLogoutData = postUserLogoutData as jest.Mock;
  const mockDeleteCookie = deleteCookie as jest.Mock;
  const mockToastSuccess = toast.success as jest.Mock;

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    render(<UserStatus user={mockUser} token={mockToken} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // 사용자가 로그인된 경우 프로필 이미지가 표시되어야 한다
  it('should display profile image when user is logged in', () => {
    const profileImage = screen.getByAltText('프로필 이미지');
    expect(profileImage).toBeInTheDocument();
  });

  // 사용자가 로그인되지 않은 경우 로그인 버튼이 표시되어야 한다
  it('should display login button when user is not logged in', () => {
    render(<UserStatus user={null} token={undefined} />);

    const loginButton = screen.getByRole('button', { name: '로그인' });
    expect(loginButton).toBeInTheDocument();
  });

  // 프로필 이미지를 클릭하면 드롭다운이 열리고 마이페이지 링크와 로그아웃 버튼이 표시되어야 한다
  it('should open the dropdown and show My Page link and Logout button when profile image is clicked', () => {
    const profileButton = screen.getByRole('button');
    fireEvent.click(profileButton);

    const mypageLink = screen.getByText('마이페이지');
    const logoutButton = screen.getByText('로그아웃');

    expect(mypageLink).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });

  // 로그아웃 버튼을 클릭하면 로그아웃 로직이 실행되어야 한다
  it('should execute logout logic when Logout button is clicked', async () => {
    mockPostUserLogoutData.mockResolvedValue(true);

    const profileButton = screen.getByRole('button');
    fireEvent.click(profileButton);

    const logoutButton = screen.getByText('로그아웃');
    fireEvent.click(logoutButton);

    // 비동기 로직이 완료될 때까지 대기
    await new Promise((resolve) => setTimeout(resolve, 0)); // setTimeout을 사용하여 다음 이벤트 루프에서 실행

    expect(mockPostUserLogoutData).toHaveBeenCalled();
    expect(mockToastSuccess).toHaveBeenCalledWith('로그아웃이 완료되었습니다.');
    expect(mockDeleteCookie).toHaveBeenCalledWith('token');
  });
});
