export interface AccountListItem {
  id: string;
  name: string;
  description: string;
  status: Status;
  proxy: string;
}

export type Status = 'working' | 'stop';