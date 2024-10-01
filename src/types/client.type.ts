export interface SignUpData {
  name: string;
  email: string;
  companyName: string;
  password: string;
  passwordCheck: string;
}

export interface SignInData extends Pick<SignUpData, 'email' | 'password'> {}

export interface UserData {
  teamId?: string;
  id: string | number;
  email: string;
  name: string;
  companyName: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export type GatheringTabsType = 'WORKATION' | 'DALLAEMFIT';
export type GatheringChipsType = 'ALL' | 'OFFICE_STRETCHING' | 'MINDFULNESS';

export type GatheringFilters = Partial<{
  type: 'WORKATION' | 'DALLAEMFIT' | 'OFFICE_STRETCHING' | 'MINDFULNESS';
  location: string | undefined;
  date: Date | null;
  sortBy: string | undefined;
  sortOrder: 'asc' | 'desc';
  offset: number;
}>;
