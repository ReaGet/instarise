import { createSlice } from "@reduxjs/toolkit"
import { accountApi, type Account } from "@/app/services/accountApi"

interface InitialState {
  accounts: Account[];
}

const initialState: InitialState = {
  accounts: [],
}

const accounts: Partial<Account>[] = [
  { id: '1123', username: '@_rea_m_', description: 'Praesentium maiores eius suscipit nihil quas natus laborum soluta quam temporibus cupiditate fuga.', proxy: '192.168.0.110', status: 'working' },
  { id: '312', username: '@landing', description: 'Come description', proxy: '132.111.101.5', status: 'stop' },
  { id: '12', username: '@pause', description: 'Some descr', proxy: '0.0.0.0', status: 'pause' },
  { id: '43', username: '@queue', description: 'Asd asdqwe', proxy: '1.111.101.5', status: 'queue' },
]

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder
    // .addMatcher(accountApi.endpoints.getAllAccounts.matchFulfilled, (state, action) => {
    //   state.accounts = action.payload;
    // })
    // .addMatcher(accountApi.endpoints.getAllAccounts.matchRejected, (state, action) => {
    //   console.log(2222, accounts)
    //   state.accounts = accounts;
    // })
  }
})


export default accountSlice.reducer