// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { postUserReg, postUserLogin } from './actionCreators'
// ** UseJWT import to get config
// import useJwt from '@src/auth/jwt/useJwt'

// const config = useJwt.jwtConfig

const initialUser = () => {
  const item = window.localStorage.getItem('userData')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : {}
}

export const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    userData: initialUser()
  },
  reducers: {
    handleLogin: (state, action) => {
      state.userData = action.payload
      // state[config.storageTokenKeyName] = action.payload[config.storageTokenKeyName]
      // state[config.storageRefreshTokenKeyName] = action.payload[config.storageRefreshTokenKeyName]
      // localStorage.setItem('userData', JSON.stringify(action.payload))
      localStorage.setItem('userData', JSON.stringify(action.payload))

      // localStorage.setItem(
      //   'userData',
      //   JSON.stringify({
      //     id: 1,
      //     fullName: 'John Doe',
      //     username: 'johndoe',
      //     avatar: '/static/media/avatar-s-11.1d46cc62.jpg',
      //     email: 'admin@demo.com',
      //     role: 'admin',
      //     ability: [
      //       {
      //         action: 'manage',
      //         subject: 'all'
      //       }
      //     ],
      //     extras: {
      //       eCommerceCartItemsCount: 5
      //     }
      //     // ,
      //     // accessToken:
      //     //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU5MTA0MDk1LCJleHAiOjE2NTkxMDQ2OTV9.FgT_WWkkDLrA85cQ590b3CUpnV-I29DBc3zYJBcczKo',
      //     // refreshToken:
      //     //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU5MTA0MDk1LCJleHAiOjE2NTkxMDQ2OTV9.5P7BXMXgkW4St9wRKNUqwW1EkiJEsC7pmhVNpxZj0gg'
      //   })
      // )

      // localStorage.setItem(
      //   'userData',
      //   JSON.stringify({
      //     id: 1,
      //     fullName: 'John Doe',
      //     username: 'johndoe',
      //     avatar: '/static/media/avatar-s-11.1d46cc62.jpg',
      //     email: 'admin@demo.com',
      //     role: 'admin',
      //     // ability: [
      //     //   {
      //     //     action: 'manage',
      //     //     subject: 'all'
      //     //   }
      //     // ]
      //     // extras: {
      //     //   eCommerceCartItemsCount: 5
      //     // }
      //     // ,
      //     // accessToken:
      //     //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU5MDgwMzg1LCJleHAiOjE2NTkwODA5ODV9._8Ms6TtRpVUXB78TCRVG-97UjVW0s_UAmz269dUBIR4',
      //     // refreshToken:
      //     //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU5MDgwMzg1LCJleHAiOjE2NTkwODA5ODV9.2Qjyfs6b2LQNt05yRjOPtPLTReDpTnVg-2t-KoIQLO0'
      //   })
      // )

      // localStorage.setItem(config.storageTokenKeyName, JSON.stringify(action.payload.accessToken))
      // localStorage.setItem(config.storageRefreshTokenKeyName, JSON.stringify(action.payload.refreshToken))
    },
    handleLogout: (state) => {
      state.userData = {}
      localStorage.removeItem('userData')
      // state[config.storageTokenKeyName] = null
      // state[config.storageRefreshTokenKeyName] = null
      // // ** Remove user, accessToken & refreshToken from localStorage
      // localStorage.removeItem('userData')
      // localStorage.removeItem(config.storageTokenKeyName)
      // localStorage.removeItem(config.storageRefreshTokenKeyName)
    },
    extraReducers: {
      [postUserReg.pending]: (state) => {
        state.loading = true
      },
      [postUserReg.fulfilled]: (state, action) => {
        state.status = 'success'
        state.data = action.payload
      },
      [postUserReg.rejected]: (state) => {
        state.status = 'failed'
      },
      [postUserLogin.pending]: (state) => {
        state.loading = true
      },
      [postUserLogin.fulfilled]: (state, action) => {
        state.status = 'success'
        state.data = action.payload
      },
      [postUserLogin.rejected]: (state) => {
        state.status = 'failed'
      }
      // ,
      // [postUserLogout.pending]: (state) => {
      //   state.loading = true
      // },
      // [postUserLogout.fulfilled]: (state, action) => {
      //   state.status = 'success'
      //   state.data = action.payload
      // },
      // [postUserLogout.rejected]: (state) => {
      //   state.status = 'failed'
      // }

      // [postUser.pending]: (state) => {
      //   state.status = 'loading'
      //   state.error = null
      // },
    }
    // postRegData
  }
})

export const { handleLogin, handleLogout } = authSlice.actions

export default authSlice.reducer
