import { useEffect } from "react";
import { FiMinus } from "react-icons/fi";
import { GoArrowLeft, GoPlus } from "react-icons/go";
import { HiMiniArrowRight } from "react-icons/hi2";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { handleCalculateMoneyShoppingCart } from "../common/handleCalculateMoneyShoppingCart";
import {
  handleCheckout,
  handleDeleteOrder,
  handleGetAllOrder,
  handleUpdateOrder,
} from "../redux/request";
import {
  handleSetDataCart,
  handleSetTotalMoney,
  handleUpdatePrice,
  handleUpdateQuantity,
} from "../redux/slices/cartSlice";

function CartPage() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.cart);
  const subTotal = handleCalculateMoneyShoppingCart(data);

  const handleUpdateOrderProduct = () => {
    data.forEach((item) => {
      dispatch(handleUpdateOrder({ id: item._id, quantity: item.quantity }));
    });
  };

  const handleDeleteCurrentOrder = (id) => {
    dispatch(handleDeleteOrder(id)).then(() => {
      dispatch(handleGetAllOrder()).then((data) => {
        const money = handleCalculateMoneyShoppingCart(data);
        dispatch(handleSetTotalMoney(money));
        dispatch(handleSetDataCart(data?.payload.orders));
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
    dispatch(handleGetAllOrder()).then((data) => {
      dispatch(handleSetDataCart(data?.payload.orders));
    });
    return () => {
      dispatch(handleGetAllOrder()).then((data) => {
        dispatch(handleSetDataCart(data?.payload.orders));
      });
    };
  }, [dispatch]);
  if (!data) return;
  return (
    <div>
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
        <>
          <div className="flex gap-x-5 pt-[120px] px-[100px]">
            <div>
              <h2 className="font-medium border p-3">Shopping Card</h2>
              <table className="border-[1.5px] rounded-sm border-slate-100 w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 text-sm uppercase font-thin text-left">
                    <th className="text-left">PRODUCTS</th>
                    <th className="text-left">PRICE</th>
                    <th className="text-left">QUANTITY</th>
                    <th className="text-left">SUB-TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <div className="flex items-center gap-x-3">
                          <IoIosCloseCircleOutline
                            className="w-5 h-5 max-w-[19px] hover:fill-red-600 hover:cursor-pointer"
                            onClick={() => handleDeleteCurrentOrder(item._id)}
                          />
                          <div className="flex items-center gap-x-5">
                            <div>
                              <img
                                src={item.product.listImage[0]}
                                alt="image product"
                                className="max-w-20 object-contain"
                              />
                            </div>
                            <p className="text-sm line-clamp-1 min-w-52 max-w-56 text-left">
                              {item.product.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="text-left min-w-[100px]">
                        ${item.product.sellingPrice}
                      </td>
                      <td className="min-w-[200px]">
                        <div className="border-2 border-slate-200 flex items-center justify-between max-w-[120px] rounded-sm p-2 select-none">
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
                      </td>
                      <td className="text-left min-w-[100px]">
                        $
                        {item.sellingPriceUpdate
                          ? item.sellingPriceUpdate
                          : item.product.sellingPrice * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex items-center border-[1.5px] border-t-transparent rounded-sm border-slate-100 justify-between px-4 py-4">
                <Link
                  to={"/"}
                  className="flex items-center justify-center bg-white text-blue-400 border-blue-400 border-2 font-medium p-2 rounded-sm gap-x-2 hover:cursor-pointer "
                >
                  <GoArrowLeft />
                  RETURN TO SHOP
                </Link>
                <div
                  className=" bg-white text-blue-400 border-blue-400 border-2 font-medium p-2 rounded-sm hover:cursor-pointer"
                  onClick={handleUpdateOrderProduct}
                >
                  UPDATE CART
                </div>
              </div>
            </div>
            <div className="border-[1.5px] border-slate-100 p-4">
              <h2 className="font-medium mb-3">Card Totals</h2>
              <div className="flex flex-col gap-y-2 text-sm">
                <div>
                  <span className="text-gray-500">Sub-total</span>
                  <span className="float-right font-medium">${subTotal}</span>
                </div>
                <div>
                  <span className="text-gray-500">Shipping</span>
                  <span className="float-right font-medium">Free</span>
                </div>
                <hr className="my-2" />
                <div>
                  <span>Total</span>
                  <span className="float-right font-semibold">
                    ${subTotal} USD
                  </span>
                </div>
                <button
                  className="flex items-center justify-center bg-orange-color text-white font-medium p-3 rounded-sm gap-x-2 hover:cursor-pointer my-2"
                  onClick={() => {
                    dispatch(handleCheckout({ data })).then((data) => {
                      window.location.href = data?.payload.url;
                    });
                  }}
                >
                  PROCEED TO CHECKOUT
                  <HiMiniArrowRight></HiMiniArrowRight>
                </button>
              </div>
              <div>
                <h2 className="font-medium">Coupon Code</h2>
                <input
                  type="text"
                  placeholder="Couple code"
                  className="text-sm outline-none border-[1.5px] border-slate-100 p-1 w-full my-2"
                />
                <button className="text-white font-medium bg-blue-500 p-2 text-sm mt-1 rounded-sm">
                  APPLY COUPON
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
