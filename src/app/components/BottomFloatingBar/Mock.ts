/* user mock data */
export const userData = {
  name: 'test name',
  id: 1234,
};

/* 모임 상세 조회 mock data */
export const groupData = {
  id: 0,
  registrationEnd: '2024-09-22T23:59:59Z',
  participantCount: 5,
  capacity: 10,
  createdBy: 1232,
  canceledAt: null,
};

/* 참가자 mock data */
export const participantsData = [
  {
    User: {
      id: 1232,
    },
  },
  {
    User: {
      id: 1534,
    },
  },
  {
    User: {
      id: 1344,
    },
  },
  {
    User: {
      id: 1654,
    },
  },
  {
    User: {
      id: 1634,
    },
  },
];

/* 예비로 추가한 이벤트핸들링함수 */
export const onCancel = () => console.log('모임이 취소되었습니다.');
export const onShare = () => console.log('모임을 공유했습니다.');
export const onJoin = () => console.log('모임에 참여했습니다.');
export const onWithdraw = () => console.log('참여를 취소했습니다.');
