import { createSlice } from "@reduxjs/toolkit";

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState: {
    data: [],
    dataRelated: [],
    srcActiveImage: "",
    quantityProduct: 1,
    activeImageOnClick: false,
  },
  reducers: {
    handleSetDataProductDetail: (state, action) => {
      state.data = action.payload;
    },
    handleSetDataRelated: (state, action) => {
      state.dataRelated = action.payload;
    },
    handleSetActiveImageOnClick: (state, action) => {
      state.activeImageOnClick = action.payload;
    },
    handleSetSrcActiveImage: (state, action) => {
      state.srcActiveImage = action.payload;
    },
    handleSetQuantityProduct: (state, action) => {
      state.quantityProduct = action.payload;
    },
  },
});
export const {
  handleSetDataProductDetail,
  handleSetDataRelated,
  handleSetActiveImageOnClick,
  handleSetSrcActiveImage,
  handleSetQuantityProduct,
} = productDetailSlice.actions;
export default productDetailSlice.reducer;
