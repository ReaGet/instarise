import { createSlice } from '@reduxjs/toolkit'
import { accountApi } from '@/app/services/accountApi'
import type { Account } from '@/app/types'
import { RootState } from '@/app/store'
import type { GroupType } from '@/app/types' 
import { groupApi } from '@/app/services/groupApi'
import { userApi } from '@/app/services/userApi'

interface InitialState {
  accounts: Account[];
  groups: GroupType[];
}

const initialState: InitialState = {
  accounts: [],
  groups: [],
}

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addMatcher(accountApi.endpoints.getAllAccounts.matchFulfilled, (state, action) => {
      state.accounts = action.payload || []
    })
    .addMatcher(groupApi.endpoints.getAllGroups.matchFulfilled, (state, action) => {
      state.groups = action.payload || []
    })
    .addMatcher(userApi.endpoints.logout.matchFulfilled, (state) => {
      state.accounts = []
      state.groups = []
    })
  }
})

export default accountSlice.reducer
export const selectAccounts = (state: RootState) => state.accountSlice.accounts
export const selectAccountById = (accountId: string) => (state: RootState) => state.accountSlice.accounts.find((a) => a.id === accountId)
export const selectGroupId = (state: RootState) => state.accountSlice.groups[0]?.name