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

// GET : /{teamId}/gatherings/joined
// 참석한 모임 목록 조회 시 Response Data
export interface myGatheringData extends GatheringsListData {
  joinedAt: string;
  isCompleted: boolean;
  isReviewed: boolean;
}
export interface FetchGatheringsResponse {
  data: myGatheringData[];
  hasNextPage: boolean;
  page: number; // 현재 페이지 번호
}
