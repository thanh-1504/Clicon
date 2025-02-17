import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    dataOrder: [],
  },
  reducers: {
    handleSetDataOrder: (state, action) => {
      state.dataOrder = action.payload;
    },
    handleSetTotalMoney: (state, action) => {
      state.totalMoney = action.payload;
    },
    handleUpdateQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const item = state.data.find((item) => item._id === itemId);
      if (item) item.quantity = quantity;
    },
    handleUpdatePrice: (state, action) => {
      const { itemId, currentPrice } = action.payload;
      const item = state.data.find((item) => item._id === itemId);
      if (item) item.sellingPriceUpdate = currentPrice * item.quantity;
    },
  },
});
export const { handleSetDataOrder } = orderSlice.actions;
export default orderSlice.reducer;
