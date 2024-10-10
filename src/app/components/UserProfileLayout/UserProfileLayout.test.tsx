import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserProfileLayout from './UserProfileLayout';
import { UserData } from '@/types/client.type';
import '@testing-library/jest-dom';
import { Dispatch, SetStateAction } from 'react';

// 프로필수정 모달 모킹
jest.mock('../Modal/ProfileEditModal', () => {
  function MockProfileEditModal({
    onClose,
    onUploadProfileImage,
    onSubmit,
    profileInput,
    setProfileInput,
  }: {
    user: UserData | null;
    onClose: () => void;
    onUploadProfileImage?: () => void;
    onSubmit?: () => void;
    imagePreview?: string;
    profileInput: string;
    setProfileInput: Dispatch<SetStateAction<string>>;
  }) {
    return (
      <div>
        <h2>프로필 수정 모달</h2>
        <button onClick={onClose}>닫기</button>
        <button onClick={onUploadProfileImage}>이미지 업로드</button>
        <button onClick={onSubmit}>수정하기</button>
        <input
          type='text'
          value={profileInput}
          onChange={(e) => setProfileInput(e.target.value)}
        />
      </div>
    );
  }

  MockProfileEditModal.displayName = 'MockProfileEditModal';
  return MockProfileEditModal;
});

// UserProfileHeader 모킹
jest.mock('./UserProfileHeader', () => {
  const MockUserProfileHeader = ({
    toggleModal,
  }: {
    toggleModal: () => void;
  }) => (
    <div>
      <div>UserProfileHeader Mock</div>
      <button onClick={toggleModal}>Edit</button>
    </div>
  );

  MockUserProfileHeader.displayName = 'MockUserProfileHeader';
  return MockUserProfileHeader;
});

const mockUser: UserData = {
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  companyName: 'Test Company',
  image: '/test-image.jpg',
  createdAt: '2024-10-01T00:00:00Z',
  updatedAt: '2024-10-03T00:00:00Z',
};

describe('UserProfileLayout', () => {
  beforeEach(() => {
    render(<UserProfileLayout user={mockUser} />);
  });

  // 기본 렌더링
  it('render correctly', () => {
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('Test Company')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByAltText('Profile')).toBeInTheDocument();
  });

  // 모달 열기 및 닫기 테스트
  it('opens and closes the ProfileEditModal', async () => {
    // 모달 열기 버튼 클릭
    fireEvent.click(screen.getByRole('button', { name: 'Edit' }));

    // 모달이 열렸는지 확인
    expect(await screen.findByText('프로필 수정 모달')).toBeInTheDocument();

    // 모달 닫기 버튼 클릭
    fireEvent.click(screen.getByRole('button', { name: '닫기' }));

    // 모달이 닫혔는지 확인
    expect(screen.queryByText('프로필 수정 모달')).not.toBeInTheDocument();
  });
});
