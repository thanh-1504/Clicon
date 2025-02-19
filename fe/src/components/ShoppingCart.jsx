/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { HiMiniArrowRight } from "react-icons/hi2";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { handleCalculateMoneyShoppingCart } from "../common/handleCalculateMoneyShoppingCart";
import {
  handleCheckout,
  handleDeleteProductInCart,
  handleGetAllProductInCart,
} from "../redux/request";
import {
  handleSetDataCart,
  handleSetTotalMoney,
} from "../redux/slices/cartSlice";

function ShoppingCart({ show, setShow }) {
  const dispatch = useDispatch();
  const { data, totalMoney } = useSelector((state) => state.cart);

  const handleDeleteCurrentOrder = (id) => {
    dispatch(handleDeleteProductInCart(id)).then(() => {
      dispatch(handleGetAllProductInCart()).then((data) => {
        const money = handleCalculateMoneyShoppingCart(data);
        dispatch(handleSetTotalMoney(money));
        dispatch(handleSetDataCart(data?.payload.cart));
      });
    });
  };

  useEffect(() => {
    dispatch(handleGetAllProductInCart()).then((dataCart) => {
      const money = handleCalculateMoneyShoppingCart(dataCart);
      dispatch(handleSetTotalMoney(money));
      dispatch(handleSetDataCart(dataCart?.payload.cart));
    });
    return () => {
      setShow(false);
    };
  }, [dispatch]);
  if (!data) return;
  return (
    <div
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      className={`cart absolute right-0 top-11 bg-white shadow-lg rounded min-w-[300px] transition-all ${
        !show && "opacity-0 invisible"
      }`}
    >
      <h3 className="p-3 text-sm font-semibold">
        Shopping Cart ({data.length})
      </h3>
      <hr />
      {data && data.length > 0 ? (
        data.map((item) => {
          return (
              <div key={item._id}>
              <Link to={`/product/${item.category}/${item.product._id}`}>
                <div className="flex items-center gap-x-2 border border-slate-300 rounded-sm p-2 min-h-[74px]">
                  <div className="w-[65px] hover:cursor-pointer">
                    <img
                      src={item.product.listImage[0]}
                      alt="image related product"
                      className="min-w-[65px] max-h-[50px] object-contain"
                    />
                  </div>
                  <div className="w-full hover:cursor-pointer">
                    <p className="text-xs line-clamp-2 ">{item.product.name}</p>
                    <span className="text-sm text-slate-500 mr-1">
                      {item.quantity} x
                    </span>
                    <span className="text-sm text-blue-500 font-medium">
                      ${item.product.sellingPrice}
                    </span>
                  </div>
                </div>
              </Link>
              <IoIosCloseCircleOutline
                className="w-7 h-7 hover:fill-red-600 hover:cursor-pointer"
                onClick={() => handleDeleteCurrentOrder(item._id)}
              />
            </div>
          );
        })
      ) : (
        <div className="flex justify-center items-center">
          <img
            src="/images/empty.jpg"
            alt="no product"
            className="w-32 h-32 object-contain"
          />
        </div>
      )}
      <hr />
      <div className="p-3 ">
        <span className="text-sm">Sub-Total:</span>
        <span className="float-right font-medium">
          ${totalMoney && totalMoney} USD
        </span>
        <div className="mt-3 flex flex-col gap-y-3">
          <button
            className="bg-orange-color text-white font-medium text-sm px-[70px] py-[10px] rounded-sm flex items-center gap-x-2"
            onClick={() => {
              if (data.length > 0)
                dispatch(handleCheckout({ data })).then((dataPayment) => {
                  window.location.href = dataPayment?.payload?.url;
                });
            }}
          >
            CHECKOUT NOW
            <HiMiniArrowRight fill="#fff" />
          </button>
          <Link
            to={"/cart"}
            className="bg-white border border-orange-color text-orange-color font-medium text-sm px-[70px] py-[10px] rounded-sm text-center"
          >
            VIEW CART
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
