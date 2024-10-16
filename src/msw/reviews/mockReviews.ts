import { ReviewsType } from '@/types/data.type';

export const MOCK_REVIEWS_BASE: ReviewsType = {
  teamId: '3-4',
  id: 1001,
  score: 5,
  comment: 'MSW 테스트 리뷰 1',
  createdAt: '2021-09-01T00:00:00',
  Gathering: {
    teamId: '3-4',
    id: 1,
    type: 'WORKATION',
    name: '워케이션',
    dateTime: '2021-09-01T00:00:00',
    location: '건대입구',
    image:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1727323795163_macbook.jpeg',
  },
  User: {
    teamId: '3-4',
    id: 969696,
    name: '채니',
    image:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1727323795163_macbook.jpeg',
  },
};

export const MOCK_REVIEWS = () => {
  const reviews: ReviewsType[] = [];
  for (let i = 0; i < 14; i++) {
    reviews.push({
      ...MOCK_REVIEWS_BASE,
      id: 1001 + i,
      comment: `MSW 테스트 리뷰 ${i + 1}`,
    });
  }

  for (let i = 15; i < 29; i++) {
    reviews.push({
      ...MOCK_REVIEWS_BASE,
      id: 1001 + i,
      comment: `MSW 테스트 리뷰 ${i + 1}`,
      Gathering: {
        ...MOCK_REVIEWS_BASE.Gathering,
        type: 'OFFICE_STRETCHING',
        name: '오피스 스트레칭',
      },
    });
  }

  for (let i = 30; i < 44; i++) {
    reviews.push({
      ...MOCK_REVIEWS_BASE,
      id: 1001 + i,
      comment: `MSW 테스트 리뷰 ${i + 1}`,
      Gathering: {
        ...MOCK_REVIEWS_BASE.Gathering,
        type: 'MINDFULNESS',
        name: '마인드풀니스',
      },
    });
  }

  return reviews;
};

export const MOCK_REVIEWS_BY_TYPE = (type?: string) => {
  if (type === 'DALLAEMFIT') {
    return [
      {
        teamId: '3-4',
        type: 'DALLAEMFIT',
        oneStar: 5,
        twoStars: 1,
        threeStars: 1,
        fourStars: 2,
        fiveStars: 12,
        averageScore: 3.7,
      },
    ];
  }

  if (type === 'OFFICE_STRETCHING') {
    return [
      {
        teamId: '3-4',
        type: 'OFFICE_STRETCHING',
        oneStar: 5,
        twoStars: 1,
        threeStars: 1,
        fourStars: 2,
        fiveStars: 9,
        averageScore: 3.5,
      },
    ];
  }

  if (type === 'MINDFULNESS') {
    return [
      {
        teamId: '3-4',
        type: 'MINDFULNESS',
        oneStar: 0,
        twoStars: 0,
        threeStars: 0,
        fourStars: 0,
        fiveStars: 3,
        averageScore: 5,
      },
    ];
  }

  if (type === 'WORKATION') {
    return [
      {
        teamId: '3-4',
        type: 'WORKATION',
        oneStar: 0,
        twoStars: 0,
        threeStars: 0,
        fourStars: 0,
        fiveStars: 2,
        averageScore: 5,
      },
    ];
  }

  return [];
};
