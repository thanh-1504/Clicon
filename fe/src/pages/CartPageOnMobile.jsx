import { useEffect, useState } from "react";
import { FiMinus } from "react-icons/fi";
import { GoArrowLeft, GoPlus } from "react-icons/go";
import { HiMiniArrowRight } from "react-icons/hi2";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { handleCalculateMoneyShoppingCart } from "../common/handleCalculateMoneyShoppingCart";
import {
  handleCheckout,
  handleDeleteProductInCart,
  handleGetAllProductInCart,
  handleUpdateProductIncart,
} from "../redux/request";
import {
  handleSetDataCart,
  handleSetTotalMoney,
  handleUpdatePrice,
  handleUpdateQuantity,
} from "../redux/slices/cartSlice";

function CartPageOnMobile() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { data } = useSelector((state) => state.cart);
  const subTotal = handleCalculateMoneyShoppingCart(data);

  const handleUpdateOrderProduct = () => {
    data.forEach((item) => {
      dispatch(
        handleUpdateProductIncart({ id: item._id, quantity: item.quantity })
      );
    });
  };

  const handleDeleteCurrentOrder = (id) => {
    dispatch(handleDeleteProductInCart(id)).then(() => {
      dispatch(handleGetAllProductInCart()).then((data) => {
        const money = handleCalculateMoneyShoppingCart(data);
        dispatch(handleSetTotalMoney(money));
        dispatch(handleSetDataCart(data?.payload.cart));
      });
    });
  };

  const handleUpdateQuantityAndPriceProduct = (
    itemId,
    quantity,
    currentPrice
  ) => {
    dispatch(handleUpdateQuantity({ itemId, quantity }));
    dispatch(handleUpdatePrice({ itemId, currentPrice }));
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const dataCart = await dispatch(handleGetAllProductInCart());
      dispatch(handleSetDataCart(dataCart?.payload.cart));
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
    fetchData();
    return () => {
      fetchData();
    };
  }, [dispatch]);
  if (!data) return;
  return (
    <div className="relative min-h-screen">
      {data && data.length === 0 ? (
        <div className="flex justify-center items-center flex-col min-h-screen">
          <img
            src="/images/empty.jpg"
            alt="Empty Cart"
            className="w-96 h-w-96 object-contain"
          />
          <p className="text-gray-500 text-lg font-bold">Your cart is empty.</p>
          <Link
            to={"/"}
            className="flex items-center justify-center bg-white text-blue-400 border-blue-400 border-2 font-medium p-2 px-16 rounded-sm gap-x-2 hover:cursor-pointer mt-5"
          >
            <GoArrowLeft />
            RETURN TO SHOP
          </Link>
        </div>
      ) : (
        <div className="pt-20">
          <h2 className="px-8 mb-4">All product ({data.length})</h2>
          <div className="w-full text-sm">
            {data.map((item) => (
              <div
                key={item}
                className="border-[1.5px] rounded-sm border-slate-100 flex items-center py-5"
              >
                <div className="">
                  <img
                    loading="lazy"
                    src={item.product.listImage[0]}
                    alt="image  product"
                    className="object-contain max-h-[85px] min-w-32"
                  />
                </div>
                <div className="min-w-[245px]">
                  <p className="text-sm line-clamp-2">{item.product.name}</p>
                  <div className="flex items-center gap-x-5 mt-3">
                    <span className="text-sm text-blue-500 font-medium">
                      ${item.product.sellingPrice}
                    </span>
                    <div className="border-2 border-slate-200 flex items-center justify-evenly rounded-sm  select-none min-w-20">
                      <FiMinus
                        className="cursor-pointer"
                        onClick={() => {
                          if (item.quantity > 1) {
                            handleUpdateQuantityAndPriceProduct(
                              item._id,
                              item.quantity - 1,
                              item.product.sellingPrice
                            );
                          }
                        }}
                      />
                      <span className="text-sm">
                        {item.quantity < 10
                          ? "0" + item.quantity
                          : item.quantity}
                      </span>
                      <GoPlus
                        className="cursor-pointer"
                        onClick={() => {
                          handleUpdateQuantityAndPriceProduct(
                            item._id,
                            item.quantity + 1,
                            item.product.sellingPrice
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
                <IoIosCloseCircleOutline
                  className="w-8 h-8  hover:fill-red-600 hover:cursor-pointer mr-4"
                  onClick={() => handleDeleteCurrentOrder(item._id)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="absolute bottom-0 w-full shadow-lg border-2">
        <div className="flex items-center justify-between py-8 px-5">
          <span>
            Total:{" "}
            <span className="text-sm text-blue-500 font-bold">
              ${subTotal}
            </span>
          </span>
          <button
            className="flex items-center justify-center bg-orange-color text-white font-medium p-2 rounded-sm gap-x-2"
            onClick={() => {
              dispatch(handleCheckout({ data })).then((dataPayment) => {
                window.location.href = dataPayment?.payload?.url;
              });
            }}
          >
            PROCEED TO CHECKOUT
            <HiMiniArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPageOnMobile;
