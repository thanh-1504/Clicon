import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: [],
    totalMoney: 0,
  },
  reducers: {
    handleSetDataCart: (state, action) => {
      state.data = action.payload;
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
export const {
  handleSetDataCart,
  handleSetTotalMoney,
  handleUpdateQuantity,
  handleUpdatePrice,
} = cartSlice.actions;
export default cartSlice.reducer;
