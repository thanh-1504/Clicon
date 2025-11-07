import { createSlice } from "@reduxjs/toolkit";

const signInSlice = createSlice({
  name: "signIn",
  initialState: { showPassword: false,  loading: false },
  reducers: {
    handleShowPassWord: (state, action) => {
      state.showPassword = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
});
export const { handleShowPassWord, setLoading } =
  signInSlice.actions;
export default signInSlice.reducer;
