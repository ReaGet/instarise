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

export type AccountStatus = 'working' | 'stop' | 'pause' | 'queue';