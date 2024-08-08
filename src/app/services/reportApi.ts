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

export const reportApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getReport: builder.query<Report[], string>({
      query: (accountId) => ({
        url: `${REPORT_URL}/tasks/client/${accountId}`,
        method: 'GET',
      })
    })
  }),
})

export const {
  useGetReportQuery
} = reportApi