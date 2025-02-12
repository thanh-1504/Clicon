import { createBrowserRouter } from "react-router";
import App from "../App";
import ManageProducts from "../components/ManageProducts";
import ManageUser from "../components/ManageUser";
import AdminPage from "../pages/AdminPage";
import CartPage from "../pages/CartPage";
import CheckoutSuccessPage from "../pages/CheckoutSuccessPage";
import MainPage from "../pages/MainPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import ShopPage from "../pages/ShopPage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/sign-up",
        element: <SignUpPage />,
      },
      {
        path: "/sign-in",
        element: <SignInPage />,
      },
      {
        path: "/setting",
        element: <SignInPage />,
      },
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/category/:categoryProduct",
        element: <ShopPage />,
      },
      {
        path: "/product/:categoryProduct/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/checkout-success",
        element: <CheckoutSuccessPage />,
      },
      {
        path: "/manage",
        element: <AdminPage />,
        children: [
          { path: "/manage/users", element: <ManageUser /> },
          { path: "/manage/products", element: <ManageProducts /> },
        ],
      },
    ],
  },
]);
