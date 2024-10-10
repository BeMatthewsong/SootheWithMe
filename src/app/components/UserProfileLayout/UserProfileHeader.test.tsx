import { render, screen, fireEvent } from '@testing-library/react';
import UserProfileHeader from './UserProfileHeader';
import '@testing-library/jest-dom';

// 이미지 모킹
jest.mock('@/public/images', () => ({
  BtnEdit: () => <div data-testid='BtnEdit' />,
  ImageProfile: () => <div data-testid='ImageProfile' />,
}));

describe('UserProfileHeader', () => {
  const mockToggleModal = jest.fn();

  beforeEach(() => {
    render(<UserProfileHeader toggleModal={mockToggleModal} />);
  });

  // 기본 렌더링
  it('renders correctly', () => {
    // 헤더 이미지가 렌더링 되었는지 확인
    const profileImage = screen.getByTestId('ImageProfile');
    expect(profileImage).toBeInTheDocument();

    // 프로필수정 버튼이 렌더링 되었는지 확인
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    // 버튼아이콘이 렌더링 되었는지 확인
    const buttonIcon = screen.getByTestId('BtnEdit');
    expect(buttonIcon).toBeInTheDocument();
  });

  // 버튼 클릭 시 toggleModal 함수가 호출되는지 확인
  it('calls toggleModal when button is clicked', () => {
    // 버튼 찾기
    const button = screen.getByRole('button');

    // 버튼 클릭
    fireEvent.click(button);

    // toggleModal 함수가 한 번 호출되었는지 확인
    expect(mockToggleModal).toHaveBeenCalledTimes(1);
  });
});
