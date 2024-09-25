// GET : /{teamId}/gatherings/joined
// 로그인된 사용자가 참석한 모임 목록 조회 시 Response Data
export interface UserJoinedGatheringsData {
  teamId: number;
  id: number;
  type: string;
  name: string;
  dateTime: string;
  registrationEnd: string;
  location: string;
  participantCount: number;
  capacity: number;
  image: string;
  createdBy: number;
  canceledAt?: string;
  joinedAt: string;
  isCompleted: boolean;
  isReviewed: boolean;
}

// GET : /{teamId}/gatherings
// 모임 목록 조회 시 Response Data
export interface GatheringsListData {
  teamId: number;
  id: number;
  type: string;
  name: string;
  dateTime: string;
  registrationEnd: string;
  location: string;
  participantCount: number;
  capacity: number;
  image: string;
  createdBy: number;
  canceledAt?: string;
}

export interface GatheringInfoType {
  teamId: number;
  id: number;
  type: string;
  name: string | null;
  dateTime: string;
  registrationEnd: string;
  location: string;
  participantCount: number;
  capacity: number;
  image: string;
  createdBy: number;
  canceledAt?: string;
}

export interface GatheringParticipantsType {
  teamId: number;
  userId: number;
  gatheringId: number;
  joinedAt: string;
  User: {
    id: number;
    email: string;
    name: string;
    companyName: string;
    image: string | null;
  };
}

// GET : /{teamId}/gatherings/joined
// 참석한 모임 목록 조회 시 Response Data
export interface myGatheringData extends GatheringsListData {
  joinedAt: string;
  isCompleted: boolean;
  isReviewed: boolean;
}
// GET : mockdata
// 무한스크롤 구현을 위한 mock data의 인터페이스입니다. 수정 및 삭제될 수 있음
export interface FetchGatheringsResponse {
  data: myGatheringData[];
  hasNextPage: boolean;
  offset: number; // 현재 페이지 번호
}

export interface ReviewsType {
  teamId: number;
  id: number;
  score: number;
  comment: string;
  createdAt: string;
  Gathering: {
    teamId: number;
    id: number;
    type: string;
    name: string;
    dateTime: string;
    location: string;
    image: string;
  };
  User: {
    teamId: number;
    id: number;
    name: string;
    image: string;
  };
}
