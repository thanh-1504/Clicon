import { createSlice } from "@reduxjs/toolkit";

const signUpSlice = createSlice({
  name: "signUp",
  initialState: {
    showPassword: false,
    showPasswordConfirm: false,
    isSignUpWithGoogle: false,
    loading: false
  },
  reducers: {
    handleShowPassWord: (state, action) => {
      state.showPassword = action.payload;
    },
    handleShowPasswordConfirm: (state, action) => {
      state.showPasswordConfirm = action.payload;
    },
    setIsSignUpWithGoogle: (state, action) => {
      state.isSignUpWithGoogle = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
});
export const {
  handleShowPassWord,
  handleShowPasswordConfirm,
  setIsSignUpWithGoogle,
  setLoading
} = signUpSlice.actions;
export default signUpSlice.reducer;
