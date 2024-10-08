import { GatheringsType } from './client.type';

// GET : /{teamId}/gatherings/joined
// 로그인된 사용자가 참석한 모임 목록 조회 시 Response Data
export interface UserJoinedGatheringsData {
  teamId: number | string;
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
  canceledAt?: string | null;
  joinedAt?: string;
  isCompleted?: boolean;
  isReviewed?: boolean;
}

// GET : /{teamId}/gatherings
// 모임 목록 조회 시 Response Data
export interface GatheringsListData {
  teamId: number | string;
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
  canceledAt?: string | null;
}

// GET : /{teamId}/gatherings/{gatheringId}
// POST: /{teamId}/gatherings
export interface GatheringInfoType {
  teamId: number | string;
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
  canceledAt?: string | null;
}

// GET : /{teamId}/gatherings/{id}/participants
export interface GatheringParticipantsType {
  teamId: number | string;
  userId: number;
  gatheringId: number;
  joinedAt: string;
  User: {
    id: number;
    email: string;
    name: string;
    companyName: string;
    image: string;
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

// GET : /{teamId}/reviews
export interface ReviewsType {
  teamId: number | string;
  id: number;
  score: number;
  comment: string;
  createdAt: string;
  Gathering: {
    teamId: number | string;
    id: number;
    type: string;
    name: string;
    dateTime: string;
    location: string;
    image: string;
  };
  User: {
    teamId: number | string;
    id: number;
    name: string;
    image: string;
  };
}

// GET : /{teamId}/reviews/scores
export interface ReviewScoreType {
  teamId: number | string;
  gatheringId?: number;
  type: string;
  averageScore: number;
  oneStar: number;
  twoStars: number;
  threeStars: number;
  fourStars: number;
  fiveStars: number;
}

// POST: /{teamId}/reviews
export interface ReviewPostType {
  teamId: number;
  id: number;
  userId: number;
  gatheringId: number;
  score: number;
  comment: string;
  createdAt: string;
}

// GetGatherings API Params Type
export interface GetGatheringsParams {
  id?: string;
  limit?: number;
  offset?: number;
  type?: GatheringsType;
  location?: string;
  date?: string;
  createdBy?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// GetReviews API Params Type
export interface GetReviewsParams {
  type?: GatheringsType;
  limit?: number;
  offset?: number;
  location?: string;
  date?: string;
  sortBy?: string; //createdAt, score, participantCount
  sortOrder?: 'asc' | 'desc';
  gatheringId?: number;
}
