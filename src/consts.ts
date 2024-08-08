import { ActionType } from "./app/providers/actions-context";
import { AccountConfig, AutoReplyConfig } from "./app/types";

export const BASE_URL = '/';
export const API_URL = 'https://instbot.ru/api';

export const SIGNIN = `${BASE_URL}sign-in`;
export const SIGNUP = `${BASE_URL}sign-up`;
export const DASHBOARD = `${BASE_URL}`;
export const ACCOUNT = `${BASE_URL}account`;

type ActionListType = { value: ActionType, text: string }[]

export const ACCOUNT_ACTIONS: ActionListType = [
  { value: "start", text: "Включить" },
  { value: "stop", text: "Отключить" },
  { value: "pause", text: "Пауза" },
  { value: "remove", text: "Удалить" },
];

export const ActionsInitialConfig: AccountConfig = {
  people: false,
  people_config: {
    timeout_from: 1,
    timeout_to: 2,
    posts_timeout_from: 1,
    posts_timeout_to: 2,
    reels_timeout_from: 1,
    reels_timeout_to: 2,
    stories_timeout_from: 1,
    stories_timeout_to: 2,
    follow: false,
    stories_like: false,
    stories_amount: 10,
    posts_like: false,
    posts_amount: 10,
    reels_like: false,
    reels_amount: 10,
    users: [],
  },
  hashtags: false,
  hashtags_config: {
    timeout_from: 1,
    timeout_to: 2,
    amount: 10,
    posts_timeout_from: 1,
    posts_timeout_to: 2,
    reels_timeout_from: 1,
    reels_timeout_to: 2,
    stories_timeout_from: 1,
    stories_timeout_to: 2,
    follow: false,
    stories_like: false,
    stories_amount: 10,
    posts_like: false,
    posts_amount: 10,
    reels_like: false,
    reels_amount: 10,
    hashtags: [],
  },
  parsing: false,
  parsing_config: {
    users: [],
    followers: false,
    followers_amount: 10,
    followings: false,
    followings_amount: 10
  }
}

export const AutoReplyInitialConfig: AutoReplyConfig = {
  text: '',
  timeout: { hours: 0 },
}
