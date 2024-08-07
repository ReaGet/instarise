import { api } from '@/app/services/api'
import { AccountStatus } from '../types';

const REPORT_URL = '/clients'

export type Report = {
  client_id: string;
  id: string;
  pid: string;
  status: AccountStatus;
  action_type: string;
  progress: string;
  time_start: string;
  time_end: string;
  errors: object;
  output: object;
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