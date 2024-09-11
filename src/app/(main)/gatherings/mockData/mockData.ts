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
