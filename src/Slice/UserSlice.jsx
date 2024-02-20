import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: localStorage.getItem('userLoginInfo') ? JSON.parse(localStorage.getItem('userLoginInfo') ) : null 
}

export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLoginInfo: (state, action) => {
      // console.log(state);
      
      state.userInfo = action.payload
    },
    
  },
})


export const { userLoginInfo } = counterSlice.actions

export default counterSlice.reducer