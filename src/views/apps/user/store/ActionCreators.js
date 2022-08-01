// ** Axios Imports
import axios from 'axios'

import { addUser } from './UsersSlice.js'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getAllUsers = createAsyncThunk('users/getAllUsers', async (_, { dispatch }) => {

  // const res = await axios.get('http://api.gate/products/list')

    console.log(res)

  res = await dispatch(addUser(res.data))

  return res
})

export const postUser = createAsyncThunk(
  'users/postUser',
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.post('http://api.gate/api/register', userData)
      console.log(res)
      if (!res.status === 201) {
        throw new Error('Server error: ')
      }
      await dispatch(addUser(userData))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)