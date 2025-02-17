import { useEffect } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { handleCalculateMoneyShoppingCart } from "../common/handleCalculateMoneyShoppingCart";
import {
  handleDeleteAllProductInCart,
  handleGetAllProductInCart,
} from "../redux/request";
import {
  handleSetDataCart,
  handleSetTotalMoney,
} from "../redux/slices/cartSlice";

function CheckoutSuccessPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleDeleteAllProductInCart()).then(() => {
      dispatch(handleGetAllProductInCart()).then((data) => {
        const money = handleCalculateMoneyShoppingCart(data);
        dispatch(handleSetTotalMoney(money));
        dispatch(handleSetDataCart(data?.payload.cart));
      });
    });
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-y-3 justify-center items-center h-screen">
      <FaRegCheckCircle className="w-12 h-12" fill="#55b94a" />
      <span className="font-semibold text-lg">Your order is successfully</span>
      <Link
        to="/"
        className="flex items-center justify-center bg-orange-color text-white font-medium p-3 px-8 rounded-sm gap-x-2 hover:cursor-pointer"
      >
        GO TO HOME
        <IoHomeOutline />
      </Link>
    </div>
  );
}

export default CheckoutSuccessPage;
