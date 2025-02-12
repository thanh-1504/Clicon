import { createSlice } from "@reduxjs/toolkit";

const signInSlice = createSlice({
  name: "signIn",
  initialState: { showPassword: false, isSignInWithGoogle: false },
  reducers: {
    handleShowPassWord: (state, action) => {
      state.showPassword = action.payload;
    },
    setIsSignInWithGoogle: (state, action) => {
      state.isSignInWithGoogle = action.payload;
    },
  },
});
export const { handleShowPassWord, setIsSignInWithGoogle } =
  signInSlice.actions;
export default signInSlice.reducer;
