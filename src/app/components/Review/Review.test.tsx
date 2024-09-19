import Review from './Review';

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// icon, image mocking
jest.mock('@/public/icons', () => ({
  IconHeart: ({ className }: { className: string }) => (
    <div data-testid='IconHeart' className={className} />
  ),
}));

jest.mock('@/public/images', () => ({
  Profile: ({ className }: { className: string }) => (
    <div data-testid='Profile' className={className} />
  ),
}));

jest.mock('next/image', () => {
  const MockImage = ({ src, alt }: { src: string; alt: string }) => (
    <div data-testid='Image'>
      <img src={src} alt={alt} />
    </div>
  );

  MockImage.displayName = 'MockImage';
  return MockImage;
});

describe('Review Component', () => {
  // 기본 렌더링 확인
  it('should render the review description, user name, and date', () => {
    render(
      <Review
        rating={3}
        description='TEST'
        user_name='Codeit'
        date='2024.09.13'
      />,
    );

    expect(screen.getByText('TEST')).toBeInTheDocument();
    expect(screen.getByText('Codeit')).toBeInTheDocument();
    expect(screen.getByText('2024.09.13')).toBeInTheDocument();
  });

  // 주어진 평점에 따라 하트 아이콘을 렌더링하는지 확인
  it('should render the rating with heart icons based on the given rating', () => {
    render(
      <Review
        rating={3}
        description='TEST'
        user_name='Codeit'
        date='2024.09.13'
      />,
    );

    const filledHearts = screen
      .getAllByTestId('IconHeart')
      .filter((icon) => icon.className.includes('text-var-orange-600'));
    const emptyHearts = screen
      .getAllByTestId('IconHeart')
      .filter((icon) => icon.className.includes('text-gray-200'));

    expect(filledHearts).toHaveLength(3);
    expect(emptyHearts).toHaveLength(2);
  });

  // 평점이 0일 때 하트 아이콘이 모두 비어있는지 확인
  it('should render all hearts as empty when rating is 0', () => {
    render(
      <Review
        rating={0}
        description='TEST'
        user_name='Codeit'
        date='2024.09.13'
      />,
    );

    const hearts = screen.getAllByTestId('IconHeart');
    const emptyHearts = hearts.filter((icon) =>
      icon.className.includes('text-gray-200'),
    );

    expect(emptyHearts).toHaveLength(5);
  });

  // image_source가 제공될 때 이미지를 렌더링하는지 확인
  it('should render the image when image_source is provided', () => {
    render(
      <Review
        image_source='/path/to/image.jpg'
        rating={4}
        description='TEST'
        user_name='Codeit'
        date='2024.09.13'
      />,
    );

    const image = screen.getByTestId('Image').querySelector('img');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/path/to/image.jpg');
    expect(image).toHaveAttribute('alt', 'review image');
  });

  // image_source가 없을 때 이미지가 렌더링되지 않는지 확인
  it('should not render the image when image_source is not provided', () => {
    render(
      <Review
        rating={4}
        description='TEST'
        user_name='Codeit'
        date='2024.09.13'
      />,
    );

    const image = screen.queryByTestId('Image');

    expect(image).toBeNull();
  });

  // 프로필 아이콘과 사용자 세부 정보를 렌더링하는지 확인
  it('should render the profile icon and user details', () => {
    render(
      <Review
        rating={5}
        description='TEST'
        user_name='Codeit'
        date='2024.09.13'
      />,
    );

    expect(screen.getByTestId('Profile')).toBeInTheDocument();
    expect(screen.getByText('Codeit')).toBeInTheDocument();
  });

  // 장소와 위치를 렌더링하는지 확인
  it('should render place and location if provided', () => {
    render(
      <Review
        rating={4}
        description='TEST'
        place='Cafe'
        location='Seoul'
        user_name='Codeit'
        date='2024.09.13'
      />,
    );

    expect(screen.getByText('Cafe 이용 · Seoul')).toBeInTheDocument();
  });

  // 장소와 위치가 없을 때 해당 정보가 렌더링되지 않는지 확인
  it('should not render place and location when not provided', () => {
    render(
      <Review
        rating={4}
        description='TEST'
        user_name='Codeit'
        date='2024.09.13'
      />,
    );

    const placeLocation = screen.queryByText(/이용 · /);

    expect(placeLocation).toBeNull();
  });
});
