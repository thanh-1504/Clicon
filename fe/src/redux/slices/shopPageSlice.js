import { createSlice } from "@reduxjs/toolkit";

const shopPageSlice = createSlice({
  name: "shopPage",
  initialState: {
    maxPriceText: 0,
    activePriceRange: false,
    dataFilterProduct: [],
    dataCategoryProduct: [],
  },
  reducers: {
    handleSetMaxPrice: (state, action) => {
      state.maxPriceText = action.payload;
    },
    handleSetDataCategoryProduct: (state, action) => {
      state.dataCategoryProduct = action.payload;
    },
    handleSetDataFilterProduct: (state, action) => {
      state.dataFilterProduct = action.payload;
    },
    handleSetActivePriceRange: (state, action) => {
      state.activePriceRange = action.payload;
    },
  },
});
export const {
  handleSetMaxPrice,
  handleSetDataCategoryProduct,
  handleSetDataFilterProduct,
  handleSetActivePriceRange,
} = shopPageSlice.actions;
export default shopPageSlice.reducer;
