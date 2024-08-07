export interface AccountsTableItem {
  id: string;
  name: string;
  description: string;
  status: AccountStatus;
  proxy: string;
}

export interface ReportsTableItem {
  id: string;
  createdAt: string;
  progress: string;
  taskType: 'parse' | 'action';
  taskStatus: AccountStatus;
  hasErrors?: boolean;
}

type ErrorDetailType = {
  loc: string[];
  msg: string;
  type: string;
}

export type AccountInfoType = {
  followers: number;
  followings: number;
}

export type GroupType = {
  id: string;
  name: string;
  docker_id: string;
  user_id: string;
}

export type ErrorRepsonseType = {
  status: number | string;
  data: {
    detail: ErrorDetailType[];
  };
}

export type AccountStatus = 'working' | 'stop' | 'pause' | 'finished';

export type AccountCredentials = {
  username: string;
  password: string;
  group: string;
  proxy: string;
  description?: string;
}

export type Account = {
  id: string;
  username: string;
  photo: string;
  description: string;
  config: AccountConfig;
  auto_reply_id: string;
  user_id: string;
  group_id: string;
  status: AccountStatus;
  proxy: string;
}

export type AccountConfig = {
  people: boolean,
  people_config: {
    timeout_from: number,
    timeout_to: number,
    posts_timeout_from: number,
    posts_timeout_to: number,
    reels_timeout_from: number,
    reels_timeout_to: number,
    stories_timeout_from: number,
    stories_timeout_to: number,
    follow: boolean,
    stories_like: boolean,
    stories_amount: number,
    posts_like: boolean,
    posts_amount: number,
    reels_like: boolean,
    reels_amount: number,
    users: string[]
  },
  hashtags: boolean,
  hashtags_config: {
    timeout_from: number,
    timeout_to: number,
    posts_timeout_from: number,
    posts_timeout_to: number,
    reels_timeout_from: number,
    reels_timeout_to: number,
    stories_timeout_from: number,
    stories_timeout_to: number,
    follow: boolean,
    stories_like: boolean,
    stories_amount: number,
    posts_like: boolean,
    posts_amount: number,
    reels_like: boolean,
    reels_amount: number,
    hashtags: string[],
    amount: number
  },
  parsing: boolean,
  parsing_config: {
    users: string[],
    followers: boolean,
    followers_amount: number,
    followings: boolean,
    followings_amount: number
  }
}

export type AutoReplyConfig = {
  text: string;
  autoReply: boolean;
  timeout_from: number;
  timeout_to: number;
}