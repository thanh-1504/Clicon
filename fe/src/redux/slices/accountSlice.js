import { createSlice } from "@reduxjs/toolkit";

const accoutSlice = createSlice({
  name: "account",
  initialState: {
    accountSettingUpdate: true,
    showUpdateProfile: false,
    showUpdateUserName: false,
    showUpdatePassword: false,
    showPassword: false,
    showConfirmPassword: false,
    showAccountSetting: false,
    imgUserBase64: "",
    isUpdateImageUser: false,
    loadingUpdateUserPhoto: false,
    loadingUpdateUserName: false,
    loadingUpdatePassword: false,
    dataUpdateUser: {},
  },
  reducers: {
    handleShowAccountSettingUpdate: (state, action) => {
      state.accountSettingUpdate = action.payload;
    },
    handleShowUpdateProfile: (state, action) => {
      state.showUpdateProfile = action.payload;
    },
    handleShowUpdateUserName: (state, action) => {
      state.showUpdateUserName = action.payload;
    },
    handleShowUpdatePassword: (state, action) => {
      state.showUpdatePassword = action.payload;
    },
    handleShowPassword: (state, action) => {
      state.showPassword = action.payload;
    },
    handleShowConfirmPassword: (state, action) => {
      state.showConfirmPassword = action.payload;
    },
    handleShowAccountSetting: (state, action) => {
      state.showAccountSetting = action.payload;
    },
    handleUpdateImageUser: (state, action) => {
      state.imgUserBase64 = action.payload?.fileImg;
      state.isUpdateImageUser = action.payload?.updateImgUser;
    },
    handleGetDataUpdateUser: (state, action) => {
      state.dataUpdateUser = action.payload;
    },
    setLoadingUpdateUserPhoto: (state, action) => {
      state.loadingUpdateUserPhoto = action.payload;
    },
    setLoadingUpdateUserName: (state, action) => {
      state.loadingUpdateUserName = action.payload;
    },
    setLoadingUpdatePassword: (state, action) => {
      state.loadingUpdatePassword = action.payload;
    },
  },
});
export const {
  handleShowAccountSettingUpdate,
  handleShowUpdateProfile,
  handleShowUpdateUserName,
  handleShowUpdatePassword,
  handleShowPassword,
  handleShowConfirmPassword,
  handleShowAccountSetting,
  handleUpdateImageUser,
  handleGetDataUpdateUser,
  setLoadingUpdateUserPhoto,
  setLoadingUpdateUserName,
  setLoadingUpdatePassword,
} = accoutSlice.actions;
export default accoutSlice.reducer;
