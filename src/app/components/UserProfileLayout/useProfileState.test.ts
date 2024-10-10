import { renderHook, act } from '@testing-library/react';
import { useProfileState } from './useProfileState';
import { UserData } from '@/types/client.type';

describe('useProfileState', () => {
  // 테스트 전에 사용할 기본 유저 데이터
  let user: UserData;

  beforeEach(() => {
    user = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      companyName: 'Test Company',
      image: 'test-image.jpg',
      createdAt: '2024-10-01T00:00:00Z',
      updatedAt: '2024-10-03T00:00:00Z',
    };
  });
  // 초기 상태 테스트
  it('should return initial state when user is null', () => {
    const { result } = renderHook(() => useProfileState(null));

    expect(result.current.profileInput).toBe('');
    expect(result.current.profileImage).toBe('');
    expect(result.current.imagePreview).toBe('');
  });

  // 유저 데이터에서 초기 상태 받아오는지 테스트
  it('should set initial state with user data', () => {
    const { result } = renderHook(() => useProfileState(user));

    // 초기 상태가 올바른지 확인합니다.
    expect(result.current.profileInput).toBe('Test Company');
    expect(result.current.profileImage).toBe('test-image.jpg');
    expect(result.current.imagePreview).toBe('test-image.jpg');
  });

  // setProfileInput으로 상태를 변경되는지 테스트
  it('should update profileInput state with setProfileInput', () => {
    const { result } = renderHook(() => useProfileState(user));

    // 상태 변경 전 확인
    expect(result.current.profileInput).toBe('Test Company');

    act(() => {
      result.current.setProfileInput('New Company');
    });

    // 상태 변경 후 확인
    expect(result.current.profileInput).toBe('New Company');
  });

  // resetProfileState 함수가 상태를 리셋하는지 테스트
  it('should reset state with resetProfileState', () => {
    const { result } = renderHook(() => useProfileState(user));

    // 상태를 변경
    act(() => {
      result.current.setProfileInput('New Company');
      result.current.setProfileImage('new-image.jpg');
      result.current.setImagePreview('new-image-preview.jpg');
    });

    // 상태 변경 후 확인
    expect(result.current.profileInput).toBe('New Company');

    // resetProfileState 호출
    act(() => {
      result.current.resetProfileState();
    });

    // 상태 리셋 후 확인
    expect(result.current.profileInput).toBe('Test Company');
    expect(result.current.profileImage).toBe('test-image.jpg');
    expect(result.current.imagePreview).toBe('test-image.jpg');
  });
});
