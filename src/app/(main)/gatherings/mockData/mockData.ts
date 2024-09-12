export const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

export const registrationEnd = new Date(tomorrow);
registrationEnd.setDate(tomorrow.getDate() - 1);

export const mockData = {
  teamId: 101,
  id: 1,
  type: 'Fitness',
  name: 'Fitness Gathering',
  dateTime: tomorrow.toISOString(),
  registrationEnd: registrationEnd.toISOString(),
  location: 'Seoul, Korea',
  participantCount: 8,
  capacity: 15,
  image: '/images/mock-image.png',
  createdBy: 1001,
  canceledAt: registrationEnd.toISOString(),
};

export const OPTIONS = [
  '건대입구',
  '을지로 3가',
  '신림',
  '홍대입구',
  '시청',
  '신대방',
  '서울대입구',
];

export const SORT_OPTIONS = ['마감 임박', '을지로 3가', '참여 인원 순'];

export interface Participant {
  User: {
    id: number;
  };
}

export const MOCK_PARTICIPANTS: Participant[] = [
  { User: { id: 0 } },
  { User: { id: 1 } },
  { User: { id: 2 } },
  { User: { id: 3 } },
  { User: { id: 4 } },
  { User: { id: 5 } },
];

export const PARTICIPANTS = [
  {
    id: 0,
    name: 'first',
    image: '/images/profile.svg',
  },
  {
    id: 1,
    name: 'second',
    image: '/images/profile.svg',
  },
  {
    id: 2,
    name: 'third',
    image: '/images/profile.svg',
  },
  {
    id: 3,
    name: 'fourth',
    image: '/images/profile.svg',
  },
  {
    id: 4,
    name: 'fifth',
    image: '/images/profile.svg',
  },
  {
    id: 5,
    name: 'sixth',
    image: '/images/profile.svg',
  },
];

export const MOCKUSER = {
  id: 0,
  name: 'first',
  image: '/images/profile.svg',
};

export const DESCRIPTION =
  '따듯하게 느껴지는 공간이에요 :) 평소에 달램 이용해보고 싶었는데 이렇게 같이 달램 생기니까 너무 좋아요! 프로그램이 더 많이 늘어났으면 좋겠어요.';

export const MOCK_REVIEWS = [
  {
    rating: 1,
    description: DESCRIPTION,
    user_name: '럽윈즈올',
    date: '2024.01.25',
  },
  {
    rating: 1,
    description: DESCRIPTION,
    user_name: '럽윈즈올',
    date: '2024.01.25',
  },
  {
    rating: 1,
    description: DESCRIPTION,
    user_name: '럽윈즈올',
    date: '2024.01.25',
  },
  {
    rating: 1,
    description: DESCRIPTION,
    user_name: '럽윈즈올',
    date: '2024.01.25',
  },
  {
    rating: 2,
    description: DESCRIPTION,
    user_name: '럽윈즈올',
    date: '2024.01.25',
  },
  {
    rating: 2,
    description: DESCRIPTION,
    user_name: '럽윈즈올',
    date: '2024.01.25',
  },
  {
    rating: 2,
    description: DESCRIPTION,
    user_name: '럽윈즈올',
    date: '2024.01.25',
  },
  {
    rating: 2,
    description: DESCRIPTION,
    user_name: '럽윈즈올',
    date: '2024.01.25',
  },
  {
    rating: 3,
    description: DESCRIPTION,
    user_name: '럽윈즈올',
    date: '2024.01.25',
  },
  {
    rating: 3,
    description: DESCRIPTION,
    user_name: '럽윈즈올',
    date: '2024.01.25',
  },
  {
    rating: 3,
    description: DESCRIPTION,
    user_name: '럽윈즈올',
    date: '2024.01.25',
  },
  {
    rating: 3,
    description: DESCRIPTION,
    user_name: '럽윈즈올',
    date: '2024.01.25',
  },
  {
    rating: 4,
    description: DESCRIPTION,
    user_name: '럽윈즈올',
    date: '2024.01.25',
  },
  {
    rating: 4,
    description: DESCRIPTION,
    user_name: '럽윈즈올',
    date: '2024.01.25',
  },
  {
    rating: 4,
    description: DESCRIPTION,
    user_name: '럽윈즈올',
    date: '2024.01.25',
  },
  {
    rating: 4,
    description: DESCRIPTION,
    user_name: '럽윈즈올',
    date: '2024.01.25',
  },
  {
    rating: 5,
    description: DESCRIPTION,
    user_name: '럽윈즈올',
    date: '2024.01.25',
  },
  {
    rating: 5,
    description: DESCRIPTION,
    user_name: '럽윈즈올',
    date: '2024.01.25',
  },
  {
    rating: 5,
    description: DESCRIPTION,
    user_name: '럽윈즈올',
    date: '2024.01.25',
  },
  {
    rating: 5,
    description: DESCRIPTION,
    user_name: '럽윈즈올',
    date: '2024.01.25',
  },
  {
    rating: 4,
    description: DESCRIPTION,
    user_name: '럽윈즈올',
    date: '2024.01.25',
  },
  {
    rating: 4,
    description: DESCRIPTION,
    user_name: '럽윈즈올',
    date: '2024.01.25',
  },
  {
    rating: 4,
    description: DESCRIPTION,
    user_name: '럽윈즈올',
    date: '2024.01.25',
  },
  {
    rating: 4,
    description: DESCRIPTION,
    user_name: '럽윈즈올',
    date: '2024.01.25',
  },
  {
    rating: 3,
    description: DESCRIPTION,
    user_name: '럽윈즈올',
    date: '2024.01.25',
  },
  {
    rating: 3,
    description: DESCRIPTION,
    user_name: '럽윈즈올',
    date: '2024.01.25',
  },
  {
    rating: 3,
    description: DESCRIPTION,
    user_name: '럽윈즈올',
    date: '2024.01.25',
  },
  {
    rating: 3,
    description: DESCRIPTION,
    user_name: '럽윈즈올',
    date: '2024.01.25',
  },
  {
    rating: 2,
    description: DESCRIPTION,
    user_name: '럽윈즈올',
    date: '2024.01.25',
  },
];
