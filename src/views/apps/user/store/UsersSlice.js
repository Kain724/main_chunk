import { createSlice } from '@reduxjs/toolkit'
import { getAllUsers
  // , postUser 
} from './ActionCreators.js'
// ** Axios Imports
// import axios from 'axios'

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    status: null,
    error: null
  },
  reducers: {
    addUser(state, action) {
      // state.data = action.payload
      state.data.push(action.payload)
    },
    getUser(state, action) {
      state.data.push(action.payload)
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = 'success'
        state.data = action.payload
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.status = 'rejected'
      })
      // .addCase(postUser.fulfilled, (state, action) => {
      //   state.status = 'success'
      //   // state.data = action.payload
      //   state.data.push(action.payload)
      // })
      // .addCase(postUser.pending, (state) => {
      //   state.status = 'loading'
      // })
      // .addCase(postUser.rejected, (state) => {
      //   state.status = 'rejected'
      // })
  }
  // extraReducers: {
  //   [getAllUsers.pending]: (state) => {
  //     state.loading = true
  //   },
  //   [getAllUsers.fulfilled]: (state, action) => {
  //     state.loading = false
  //     state.data = action.payload
  //   },
  //   [getAllUsers.rejected]: (state) => {
  //     state.loading = false
  //   },
  //   [postUser.pending]: (state) => {
  //     state.status = 'loading'
  //     state.error = null
  //   },
  //   [postUser.fulfilled]: (state, action) => {
  //     // state.status = 'resolved'
  //     state.loading = false
  //     // state.error = null
  //     // state.data = action.payload
  //     state.data.push(action.payload)
  //     // state.data = push(action.payload)
  //   }
  //   // [fetchUsers.rejected]: (state, action) => {}
  // }
})

export const { addUser, getUser } = usersSlice.actions

export default usersSlice.reducer