import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clubId: null,
  coeId: null,
  isAuthorised: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSucess: (state, action) => {
      console.log("Inside login success",JSON.stringify(action.payload));
      state.isAuthorised = true;

      if (action.payload.clubId !== undefined) {
        state.clubId = action.payload.clubId;
      } else if(action.payload.coeId !== undefined) {
        state.coeId = action.payload.coeId;
        console.log("Inside coe else",JSON.stringify(state));
      }else{
        state.coeId =null;
        state.clubId =null;

      }
    },
    loginFail: (state) => {
      state.isAuthorised = false;
      state.clubId = null;
      state.coeId = null;
    },
    logoutSuccess: (state) => {
      state.isAuthorised = false;
      state.clubId = null;
      state.coeId = null;
    },
    logoutFail: (state) => {
      state.isAuthorised = false;
      state.clubId = null;
      state.coeId = null;
    },
  },
});

export const { loginSucess, loginFail,logoutSuccess,logoutFail } = authSlice.actions;

export default authSlice.reducer;
