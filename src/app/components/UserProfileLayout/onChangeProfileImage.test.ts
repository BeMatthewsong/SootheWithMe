import { ChangeEvent } from 'react';
import onChangeProfileImage from './onChangeProfileImage';

describe('onChangeProfileImage', () => {
  let setProfileImage: jest.Mock;
  let setImagePreview: jest.Mock;

  beforeEach(() => {
    setProfileImage = jest.fn();
    setImagePreview = jest.fn();
  });

  // 파일이 선택되었을 때 올바른 인자와 함께 setProfileImage와 setImagePreview가 호출되는지 테스트
  it('should call setProfileImage and setImagePreview with the correct values', () => {
    const mockFile = new File([''], 'test-image.png', { type: 'image/png' });
    const fileChangeEvent = {
      target: {
        files: {
          0: mockFile,
          length: 1,
          item: (index: number) => (index === 0 ? mockFile : null),
          [Symbol.iterator]: function* () {
            yield mockFile;
          },
        } as FileList,
      },
    } as ChangeEvent<HTMLInputElement>;

    const handleChange = onChangeProfileImage({
      setProfileImage,
      setImagePreview,
    });
    handleChange(fileChangeEvent); // 함수 호출

    // FileReader를 모킹
    const reader = new FileReader();

    // FileReader의 onloadend 핸들러를 직접 호출하여 미리보기 설정
    reader.onloadend = jest.fn(() => {
      setImagePreview(reader.result as string);
    });

    // FileReader의 readAsDataURL 메서드를 모킹
    reader.readAsDataURL = jest.fn((file) => {
      // 직접 onloadend 호출, 인자로 가짜 ProgressEvent 객체 전달
      const progressEvent = new ProgressEvent(
        'loadend',
      ) as ProgressEvent<FileReader>;

      reader.onloadend?.(progressEvent);
    });

    // readAsDataURL 메서드 호출
    reader.readAsDataURL(mockFile);

    expect(setProfileImage).toHaveBeenCalledWith(mockFile); // setProfileImage가 올바른 인자와 함께 호출되었는지 확인
    expect(setImagePreview).toHaveBeenCalled(); // setImagePreview가 호출되었는지 확인
  });

  // 파일이 선택되지 않았을 때 setProfileImage와 setImagePreview가 호출되지 않아야 하는지 테스트
  it('should not call setProfileImage or setImagePreview when no file is selected', () => {
    const fileChangeEvent = {
      target: {
        files: {
          length: 0,
          item: jest.fn(),
          [Symbol.iterator]: function* () {},
        } as FileList,
      },
    } as ChangeEvent<HTMLInputElement>;

    const handleChange = onChangeProfileImage({
      setProfileImage,
      setImagePreview,
    });
    handleChange(fileChangeEvent); // 함수 호출

    expect(setProfileImage).not.toHaveBeenCalled(); // setProfileImage가 호출되지 않았는지 확인
    expect(setImagePreview).not.toHaveBeenCalled(); // setImagePreview가 호출되지 않았는지 확인
  });
});
