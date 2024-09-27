import { GatheringsListData } from '@/types/data.type';

export const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

export const registrationEnd = new Date(tomorrow);
registrationEnd.setDate(tomorrow.getDate() - 1);

export const DATA_LIST: GatheringsListData[] = [
  {
    teamId: 0,
    id: 0,
    type: 'dalaemfit',
    name: '달램핏 오피스 스트레칭',
    dateTime: tomorrow.toISOString(),
    registrationEnd: registrationEnd.toISOString(),
    location: '을지로 3가',
    participantCount: 12,
    capacity: 20,
    image: '/images/mock-image.png',
    createdBy: 0,
  },
  {
    teamId: 0,
    id: 1,
    type: 'dalaemfit',
    name: '달램핏 오피스 스트레칭',
    dateTime: tomorrow.toISOString(),
    registrationEnd: registrationEnd.toISOString(),
    location: '을지로 3가',
    participantCount: 12,
    capacity: 20,
    image: '/images/mock-image.png',
    createdBy: 0,
  },
  {
    teamId: 0,
    id: 2,
    type: 'dalaemfit',
    name: '달램핏 오피스 스트레칭',
    dateTime: tomorrow.toISOString(),
    registrationEnd: registrationEnd.toISOString(),
    location: '을지로 3가',
    participantCount: 12,
    capacity: 20,
    image: '/images/mock-image.png',
    createdBy: 0,
  },
  {
    teamId: 0,
    id: 3,
    type: 'dalaemfit',
    name: '달램핏 오피스 스트레칭',
    dateTime: tomorrow.toISOString(),
    registrationEnd: registrationEnd.toISOString(),
    location: '을지로 3가',
    participantCount: 12,
    capacity: 20,
    image: '/images/mock-image.png',
    createdBy: 0,
  },
];

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
