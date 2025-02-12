import { useEffect } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { handleSetDataCart } from "../redux/slices/cartSlice";
import { handleDeleteAllOrder, handleGetAllOrder } from "../redux/request";

function CheckoutSuccessPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleDeleteAllOrder()).then(() => {
      dispatch(handleGetAllOrder()).then((data) => {
        dispatch(handleSetDataCart(data?.payload.orders));
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
