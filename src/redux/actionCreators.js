// ** Axios Imports
import axios from 'axios'
import { handleLogin } from './authentication.js'
import { createAsyncThunk } from '@reduxjs/toolkit'

// layout: 'blank',
// publicRoute: true,
// restricted: true
// dashboard/ecommerce

export const postUserLogin = createAsyncThunk(
  'users/postUserLogin',
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.post('http://api.gate/api/login', userData)
      if (res.status === 201) {
        dispatch(handleLogin(res.data.user))
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const postUserReg = createAsyncThunk(
  'users/postUser',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post('http://api.gate/api/register', userData)

      if (!res.status === 201) {
        throw new Error('Server error: ')
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)