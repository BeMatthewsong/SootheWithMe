import { render, screen } from '@testing-library/react';
import UserInfo from './UserInfo';
import '@testing-library/jest-dom';
import { UserData } from '@/types/client.type';

describe('UserInfo', () => {
  const mockUser: UserData = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    companyName: 'Test Company',
    image: 'test-image.jpg',
    createdAt: '2024-10-01T00:00:00Z',
    updatedAt: '2024-10-03T00:00:00Z',
  };

  // 유저 정보가 정상적으로 렌더링
  it('renders user information correctly', () => {
    // 컴포넌트를 렌더링할 때 mockUser를 prop으로 전달
    render(<UserInfo user={mockUser} />);

    // 이름, 회사명, 이메일이 올바르게 화면에 표시되는지 확인
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('Test Company')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  // user prop이 null일 때 아무것도 렌더링 안됨
  it('renders nothing when user prop is null', () => {
    // user가 null인 경우로 렌더링
    render(<UserInfo user={null} />);

    // 유저 정보가 존재하지 않으므로 해당 요소들이 화면에 없는지 확인
    expect(screen.queryByText('Test User')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Company')).not.toBeInTheDocument();
    expect(screen.queryByText('test@example.com')).not.toBeInTheDocument();
  });
});
