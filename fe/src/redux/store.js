import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "./slices/accountSlice";
import cartSlice from "./slices/cartSlice";
import manageSlice from "./slices/manageSlice";
import productDetailSlice from "./slices/productDetailSlice";
import shopPageSlice from "./slices/shopPageSlice";
import signInSlice from "./slices/signInSlice";
import signUpSlice from "./slices/signUpSlice";

export const store = configureStore({
  reducer: {
    signUp: signUpSlice,
    signIn: signInSlice,
    account: accountSlice,
    manage: manageSlice,
    shopPage: shopPageSlice,
    cart: cartSlice,
    productDetail: productDetailSlice,
  },
});
