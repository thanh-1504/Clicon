import { createSlice } from "@reduxjs/toolkit";

const manageSlice = createSlice({
  name: "manage",
  initialState: {
    showModalMangeProduct: false,
    showModalAddUser: false,
    allUsers: undefined,
    allProduct: undefined,
    uploadImageProduct: false,
    loadingUploadImageProduct: false,
  },
  reducers: {
    handleShowManageProduct: (state, action) => {
      state.showModalMangeProduct = action.payload;
    },
    handleShowModalAddUser: (state, action) => {
      state.showModalAddUser = action.payload;
    },
    handleSetDataAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    handleUploadImageProduct: (state, action) => {
      state.uploadImageProduct = action.payload;
    },
    handleSetLoadingUploadImageProduct: (state, action) => {
      state.loadingUploadImageProduct = action.payload;
    },
    handleSetAllProduct: (state, action) => {
      state.allProduct = action.payload;
    },
  },
});
export const {
  handleShowManageProduct,
  handleShowModalAddUser,
  handleSetDataAllUsers,
  handleUploadImageProduct,
  handleSetLoadingUploadImageProduct,
  handleSetAllProduct,
} = manageSlice.actions;
export default manageSlice.reducer;
