import { UserJoinedGatheringsData } from '@/types/data.type';

export const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

export const registrationEnd = new Date(tomorrow);
registrationEnd.setDate(tomorrow.getDate() - 1);

export const DATA_LIST: UserJoinedGatheringsData[] = [
  {
    teamId: 0,
    id: 0,
    type: 'dalaemfit',
    name: '달램핏 오피스 스트레칭',
    dateTime: tomorrow.toISOString(),
    registrationEnd: registrationEnd.toISOString(),
    location: '을지로 3가',
    participantCount: 20,
    capacity: 20,
    image: '/images/mock-image.png',
    createdBy: 0,
    joinedAt: registrationEnd.toISOString(),
    isCompleted: true,
    isReviewed: true,
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
    joinedAt: registrationEnd.toISOString(),
    isCompleted: true,
    isReviewed: true,
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
    joinedAt: registrationEnd.toISOString(),
    isCompleted: true,
    isReviewed: true,
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
    joinedAt: registrationEnd.toISOString(),
    isCompleted: true,
    isReviewed: true,
  },
];
