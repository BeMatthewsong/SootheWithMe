// 모임 만들기에서 가능한 시간대
export const GATHERING_TIMES = {
  MORNING: ['09:00', '10:00', '11:00'],
  AFTERNOON: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
};

// 마이페이지 리뷰 탭
export const MYPAGE_REVIEW_TABS = {
  WRITABLE: '작성 가능한 리뷰',
  WRITTEN: '작성한 리뷰',
};

// /gatherings filtering 옵션
export const LOCATION_OPTIONS = ['건대입구', '을지로3가', '신림', '홍대입구'];

// /gatherings sorting 옵션
export const SORT_OPTIONS = ['최신순', '마감 임박', '참여 인원 순'];

// /reviews sorting 옵션
export const REVIEW_SORT_OPTIONS = ['최신순', '평점 높은 순', '참여 인원 순'];

export const REVIEWS_PER_PAGE = 4;

export const MIN_PARTICIPANTS = 5;

// 무한스크롤 관련 데이터 패칭 상수
export const DEFAULT_GATHERINGS_OFFSET = 0;
export const DEFAULT_GATHERINGS_LIMIT = 10;

export const LIMIT_PER_REQUEST = 10;

export const SORT_OPTIONS_MAP: Record<string, string> = {
  최신순: 'dateTime',
  '마감 임박': 'registrationEnd',
  '참여 인원 순': 'participantCount',
};

export const REVIEW_SORT_OPTIONS_MAP: Record<string, string> = {
  최신순: 'createdAt',
  '평점 높은 순': 'score',
  '참여 인원 순': 'participantCount',
};

// 업로드할 이미지 최대 크기
export const MAX_IMAGE_SIZE_BYTES = 1 * 1024 * 1024; // 1MB

// 토큰 만료시간
export const EXPIRY_TIME = 3600 * 1000; //1시간

// 모임 만들기 내 모임 날짜 기한
export const MAKING_GATHERING_DATE_DEADLINE = 365;
