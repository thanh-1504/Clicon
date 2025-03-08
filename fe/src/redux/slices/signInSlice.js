import { createSlice } from "@reduxjs/toolkit";

const signInSlice = createSlice({
  name: "signIn",
  initialState: { showPassword: false, isSignInWithGoogle: false, loading: false },
  reducers: {
    handleShowPassWord: (state, action) => {
      state.showPassword = action.payload;
    },
    setIsSignInWithGoogle: (state, action) => {
      state.isSignInWithGoogle = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
});
export const { handleShowPassWord, setIsSignInWithGoogle, setLoading } =
  signInSlice.actions;
export default signInSlice.reducer;
