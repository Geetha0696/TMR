import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authToken: null,
    userInfo: {
      first_name: "",
      last_name: "",
      profile_image_data: "/"
    },
    language: 'en'
  },
  reducers: {
    setToken: (state, action) => {
      state.authToken = action.payload;
    },
    removeToken: (state) => {
      state.authToken = null
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    removeUserInfo: (state) => {
      state.userInfo = {
        first_name: "",
        last_name: "",
        profile_image_data: "/"
      }
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
})

export const { setToken, removeToken, setUserInfo, removeUserInfo, setLanguage } = authSlice.actions

export default authSlice.reducer