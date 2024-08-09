import { api } from '@/app/services/api'
import { AccountStatus } from '../types';

const REPORT_URL = '/clients'

export type Report = {
  client_id: string;
  id: string;
  pid: string;
  status: AccountStatus;
  action_type: 'action' | 'parsing';
  time_start: string;
  time_end: string;
  progress_people: string;
  progress_hashtags: string;
  is_error_people: boolean;
  is_error_hashtags: boolean;
}

export type TaskLogType = {
  follow: boolean;
  posts_like: number;
  stories_like: number;
  reels_like: number;
}

export type TaskErrorType = {
  error: string
}


export type LogsSuccessType = {
  people: Record<string, TaskLogType>;
  hashtags: Record<string, TaskLogType>;
}

// type AccountLogErrorType = {
//   error: string;
//   follow: boolean;
//   posts_like: number;
//   stories_like: number;
//   reels_like: number;
// }

export type LogsErrorType = {
  people: Record<string, TaskErrorType>;
  hashtags: Record<string, TaskErrorType>;
}

export type LogsType = {
  logs: LogsSuccessType;
  errors: LogsErrorType;
}

export const reportApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getReports: builder.query<Report[], string>({
      query: (accountId) => ({
        url: `${REPORT_URL}/tasks/client/${accountId}`,
        method: 'GET',
      })
    }),
    getReportsLogs: builder.query<LogsType, string>({
      query: (taskId) => ({
        url: `${REPORT_URL}/tasks/logs/${taskId}`,
        method: 'GET',
      })
    })
  }),
})

export const {
  useGetReportsQuery,
  useGetReportsLogsQuery,
} = reportApi