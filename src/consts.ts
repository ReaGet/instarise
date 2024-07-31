import { ActionType } from "./app/providers/actions-context";

export const BASE_URL = '/instarise/';
export const API_URL = 'http://localhost:3000/';

export const SIGNIN = `${BASE_URL}sign-in`;
export const DASHBOARD = `${BASE_URL}`;
export const ACCOUNT = `${BASE_URL}account`;

type ActionListType = { value: ActionType, text: string }[]

export const ACCOUNT_ACTIONS: ActionListType = [
  { value: "start", text: "Включить" },
  { value: "stop", text: "Отключить" },
  { value: "pause", text: "Пауза" },
  { value: "remove", text: "Удалить" },
];