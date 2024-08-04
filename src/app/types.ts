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
  loc: string[],
  msg: string,
  type: string
}

export type ErrorRepsonseType = {
  status: number;
  data: {
    detail: ErrorDetailType[];
  };
}

export type AccountStatus = 'working' | 'stop' | 'pause' | 'finish';