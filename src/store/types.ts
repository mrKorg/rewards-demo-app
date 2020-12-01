export interface Reward {
  id: number;
  experience?: string;
  status?: string;
  user?: number;
  date?: string;
}

export interface User {
  id: number;
  name?: string;
}

export interface RewardsState {
  data: Reward[];
  loading?: boolean;
  error?: string;
  tabs?: string[];
  selectedTab?: string;
}

export interface UsersState {
  data: User[];
  loading?: boolean;
  error?: string;
}

export interface AppState {
  rewards: RewardsState;
  users: UsersState;
  getState: () => any;
}
