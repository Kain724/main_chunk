// ** Axios Imports
import axios from 'axios'

import { addUser } from './UsersSlice.js'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getAllUsers = createAsyncThunk(
  'users/getAllUsers',
  async (_, { rejectWithValue }) => {
    // async (userData, { dispatch, rejectWithValue }) => {
    try {
      // const tokenBearer = {
      //   headers: { Authorization: `Bearer ${userData.token}` }
      // }
      // delete userData.token
      const res = await axios.get(
        'http://api.gate/api/users'
        // tokenBearer
      )

      if (res.status === 201 || 200) {
        console.log('🚀 ~ file: ActionCreators.js ~ line 19 ~ res', res)
        dispatch(addUser(res.data))
        
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }

  // console.log(res)

  // res = await dispatch(addUser(res.data))

  // return res
)

export const postUser = createAsyncThunk(
  'users/postUser',

  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const tokenBearer = {
        headers: { Authorization: `Bearer ${userData.token}` }
      }
      delete userData.token
      const res = await axios.post('http://api.gate/api/create_user', userData, tokenBearer)

      if (res.status === 201) {
        dispatch(addUser(userData))
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
