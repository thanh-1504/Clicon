/* eslint-disable no-unsafe-optional-chaining */
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BsCart2 } from "react-icons/bs";
import { CiCreditCard1, CiHeadphones } from "react-icons/ci";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { IoMdStar } from "react-icons/io";
import { PiHandshakeLight, PiMedal, PiTruck } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Slider from "react-slick";
import { toast, ToastContainer } from "react-toastify";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import RelatedProductItem from "../components/RelatedProductItem";
import {
  handleAddProductToCart,
  handleCheckout,
  handleGetAllProduct,
  handleGetAllProductInCart,
  handleGetDetailProduct,
  handleGetProductByCategory,
} from "../redux/request";
import {
  handleSetDataCart,
  handleSetTotalMoney,
} from "../redux/slices/cartSlice";
import {
  handleSetActiveImageOnClick,
  handleSetDataProductDetail,
  handleSetQuantityProduct,
  handleSetSrcActiveImage,
} from "../redux/slices/productDetailSlice";

const getRandomProducts = (products, count = 3) => {
  const shuffledProducts = products.sort(() => Math.random() - 0.5);
  return shuffledProducts.slice(0, count);
};

function ProductDetailPage() {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const screenWidth = window.innerWidth;
  const { categoryProduct, id } = useParams();
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [dataRelated, setDataRelated] = useState([]);
  const userCurrent = JSON.parse(localStorage.getItem("user"));
  const { data, activeImageOnClick, srcActiveImage, quantityProduct } =
    useSelector((state) => state.productDetail);
  const settings = {
    infinite: false,
    slidesToShow: 6,
    slidesToScroll: 6,
    arrows: true,
  };

  const handleAddToCart = () => {
    if (!userCurrent?.displayName) {
      window.location.href = "https://clicon-abfr.onrender.com/sign-in";
      return;
    } else {
      if (isAdding) return;
      setIsAdding(true);
      dispatch(
        handleAddProductToCart({
          product: id,
          quantity: quantityProduct,
        })
      ).then((data) => {
        if (
          data.payload.response?.data.message ===
          "You don't have permisson to perfom this action"
        ) {
          toast.info("Only users can purchase", {
            position: "top-center",
            autoClose: 1000,
            pauseOnHover: false,
            containerId: "toast-detailProduct",
          });
          setTimeout(() => {
            setIsAdding(false);
          }, 1000);
          return;
        } else {
          dispatch(handleGetAllProductInCart()).then((data) => {
            const money = data?.payload.cart?.reduce((total, order) => {
              return total + order.quantity * order.product.sellingPrice;
            }, 0);
            dispatch(handleSetTotalMoney(money));
            dispatch(handleSetDataCart(data?.payload.cart));
          });
        }
        setTimeout(() => {
          setIsAdding(false);
        }, 1000);
      });
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const productDetailData = await dispatch(handleGetDetailProduct(id));
        dispatch(
          handleSetDataProductDetail(productDetailData?.payload.product)
        );
        const [categoryData, phoneData, accessoriesData, featureProductData] =
          await Promise.all([
            dispatch(handleGetProductByCategory(categoryProduct)),
            dispatch(handleGetProductByCategory("accessories")),
            dispatch(handleGetProductByCategory("phone")),
            dispatch(handleGetAllProduct()),
          ]);
        const allRelatedProducts = [
          ...getRandomProducts(categoryData?.payload.products, 3),
          ...getRandomProducts(phoneData?.payload.products, 3),
          ...getRandomProducts(accessoriesData?.payload.products, 3),
          ...getRandomProducts(featureProductData?.payload.products, 3),
        ];
        setDataRelated(allRelatedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data", error);
      }
    };
    fetchData();
    return () => {
      dispatch(handleSetActiveImageOnClick(false));
      dispatch(handleSetQuantityProduct(1));
    };
  }, [dispatch, id, categoryProduct]);
  if (!data) return;
  return (
    <div className="pt-[120px] lg:px-[150px] 2xl:px-[350px]">
      <div className="flex items-start sm:flex-col lg:flex-row">
        <div className="w-2/4 sm:w-full 2xl:w-fit 2xl:mr-10">
          <div className="border border-slate-300 lg:rounded-md lg:max-w-[400px] mb-4">
            {loading ? (
              <img
                src=""
                className="w-full min-h-[400px] object-contain bg-gray-200 animate-pulse"
              />
            ) : (
              <img
                src={
                  activeImageOnClick && srcActiveImage
                    ? srcActiveImage
                    : data.listImage && data.listImage.length > 0
                    ? data.listImage[0]
                    : ""
                }
                alt="image product"
                className="w-full min-h-[400px] 2xl:min-w-[400px] object-contain"
              />
            )}
          </div>
          <Slider {...settings} className="custom__slider-productDetail">
            {loading
              ? Array.from({ length: 6 }).map((_, index) => {
                  return (
                    <div
                      key={index}
                      className="border border-slate-300 rounded-sm cursor-pointer outline-none bg-gray-200 animate-pulse"
                    >
                      <div className="w-full h-full min-h-[60px] bg-gray-200"></div>
                    </div>
                  );
                })
              : data.listImage &&
                data.listImage.length > 0 &&
                data.listImage.map((image, index) => {
                  return (
                    <div
                      key={index}
                      className="border border-slate-300 rounded-sm cursor-pointer outline-none"
                      onClick={() => {
                        dispatch(handleSetActiveImageOnClick(true));
                        dispatch(handleSetSrcActiveImage(image));
                      }}
                    >
                      <img
                        src={image}
                        alt="image product"
                        className="w-full h-full min-h-[60px] object-contain"
                      />
                    </div>
                  );
                })}
          </Slider>
        </div>
        <div className="w-2/4 sm:w-full sm:px-3">
          <div className="flex items-center">
            <IoMdStar className="text-yellow-400 inline mr-2" />
            <span className="text-sm font-medium">
              {loading ? "" : "4.7 Star Rating"}
            </span>
          </div>
          <h2
            className={`my-2 ${
              loading ? "bg-gray-200 animate-pulse w-96 h-8 rounded-sm" : ""
            }`}
          >
            {loading ? "" : data?.name}
          </h2>
          <div className="flex flex-col text-sm gap-y-1">
            {loading ? (
              <>
                <div className="h-4 w-24 bg-gray-300 animate-pulse rounded-sm rounded-sm"></div>{" "}
                <div className="h-4 w-32 bg-gray-300 animate-pulse rounded-sm rounded-sm"></div>{" "}
              </>
            ) : (
              <>
                <span className="text-slate-500">
                  Brand:{" "}
                  <span className="font-medium text-black">{data.brand}</span>
                </span>
                <span className="text-slate-500">
                  Availability:{" "}
                  <span className="font-medium text-green-500">In Stock</span>
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-x-2 mt-4">
            {loading ? (
              <>
                <div className="h-6 w-24 bg-gray-300 animate-pulse rounded-sm"></div>{" "}
                <div className="h-6 w-24 bg-gray-300 animate-pulse rounded-sm"></div>{" "}
              </>
            ) : (
              <>
                <span className="text-lg text-blue-500 font-semibold">
                  ${data?.sellingPrice}
                </span>
                <span className="line-through text-slate-400">
                  ${data.price}
                </span>
              </>
            )}
          </div>
          {/* <hr className="my-5 border-slate-300" /> */}
          {/* <div className="flex items-start">
            <div className="flex flex-col w-2/4">
              <label className="text-sm mb-2">Color</label>
              <div className="flex gap-x-4">
                <div>
                  <input
                    type="radio"
                    name="color"
                    id="color1"
                    className="hidden input__color"
                  />
                  <label
                    htmlFor="color1"
                    className="w-7 h-7 bg-slate-500 rounded-full border cursor-pointer inline-block label__color"
                  ></label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="color"
                    id="color1"
                    className="hidden input__color"
                  />
                  <label
                    htmlFor="color1"
                    className="w-7 h-7 bg-slate-500 rounded-full border cursor-pointer inline-block label__color"
                  ></label>
                </div>
              </div>
            </div>
            <div className="w-2/4">
              <label className="text-sm">Size</label>
              <select
                name=""
                id=""
                className="outline-none border border-slate-300 min-w-[200px] p-2 mt-2 text-sm"
              >
                <option value="">14 inch Liquid Retina XDR display</option>
              </select>
            </div>
          </div>
          <div className="flex items-start mt-2">
            <div className="w-2/4">
              <label className="text-sm mb-2">Memory</label>
              <select
                name=""
                id=""
                className="outline-none border border-slate-300 mt-2 text-sm min-w-[200px] px-2 min-h-9"
              >
                <option value="">16GB unified memory</option>
              </select>
            </div>
            <div className="w-2/4">
              <label className="text-sm">Storage</label>
              <select
                name=""
                id=""
                className="outline-none border border-slate-300 min-h-9 px-2 min-w-[200px] mt-2 text-sm"
              >
                <option value="">14 inch Liquid Retina XDR display</option>
              </select>
            </div>
          </div> */}
          {userCurrent?.role !== "ADMIN" && (
            <div className="flex justify-between mt-8 items-start 2xl:justify-normal 2xl:gap-x-5">
              <div className="border-2 border-slate-200 flex items-center justify-between min-w-[120px] rounded-sm p-2 select-none">
                <FiMinus
                  className="cursor-pointer"
                  onClick={() => {
                    if (quantityProduct > 1)
                      dispatch(handleSetQuantityProduct(quantityProduct - 1));
                  }}
                ></FiMinus>
                <span className="text-sm">
                  {quantityProduct < 10
                    ? `0${quantityProduct}`
                    : quantityProduct}
                </span>
                <GoPlus
                  className="cursor-pointer"
                  onClick={() => {
                    dispatch(handleSetQuantityProduct(quantityProduct + 1));
                  }}
                ></GoPlus>
              </div>
              <button
                className="bg-orange-color text-white font-medium text-sm px-[70px] py-[10px] rounded-sm flex items-center gap-x-2"
                disabled={isAdding}
                onClick={handleAddToCart}
              >
                ADD TO CARD
                <BsCart2 fill="#fff" />
              </button>
              <button
                className="text-orange-color font-medium text-sm border-orange-color border-2 outline-none py-2 px-2 rounded-sm sm:hidden lg:block 2xl:px-10"
                onClick={() => {
                  dispatch(handleCheckout({ data })).then((dataPayment) => {
                    console.log(dataPayment)
                    if (!userCurrent?.displayName) {
                      window.location.href =
                        "https://clicon-abfr.onrender.com/sign-in";
                      return;
                    }
                    // window.location.href = dataPayment?.payload?.url;
                  });
                }}
              >
                BUY NOW
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-10 border-2 border-slate-100 text-sm rounded-sm flex items-start p-4 sm:flex-col lg:flex-row">
        <div className="w-1/3 mr-[50px] sm:w-full">
          <span className="font-medium mb-2 block">Description</span>
          <p className="text-slate-500">{data?.description}</p>
        </div>
        <div className="w-1/3 sm:w-full sm:my-5 lg:my-0">
          <span className="font-medium mb-2 block">Feature</span>
          <div>
            <div className="mb-2 flex items-center">
              <PiMedal className="inline w-5 h-5 mr-[6px]" fill="#fa8232" />
              <span>Free 1 Year Warranty</span>
            </div>
            <div className="mb-2 flex items-center">
              <PiTruck className="inline w-5 h-5 mr-[6px]" fill="#fa8232" />
              <span>Free Shipping & Fasted Delivery</span>
            </div>
            <div className="mb-2 flex items-center">
              <PiHandshakeLight
                className="inline w-5 h-5 mr-[6px]"
                fill="#fa8232"
              />
              <span>100% Money-back guarantee</span>
            </div>
            <div className="mb-2 flex items-center">
              <CiHeadphones
                className="inline w-5 h-5 mr-[6px]"
                fill="#fa8232"
              />
              <span>24/7 Customer support</span>
            </div>
            <div className="flex items-center">
              <CiCreditCard1
                className="inline w-5 h-5 mr-[6px]"
                fill="#fa8232"
              />
              <span>Secure payment method</span>
            </div>
          </div>
        </div>
        <div className="w-1/3 sm:w-full">
          <span className="font-medium mb-2 block">Shipping Information</span>
          <p className="font-medium mb-2">
            Courier:{" "}
            <span className="text-gray-500 ">2-4 days, free shipping</span>
          </p>
          <p className="font-medium mb-2">
            Local Shipping:{" "}
            <span className="text-gray-500 ">up to one week, $19.00</span>
          </p>
          <p className="font-medium mb-2">
            UPS Ground Shipping:{" "}
            <span className="text-gray-500 ">4-6 days, $29.00</span>
          </p>
          <p className="font-medium mb-2">
            Unishop Global Export:{" "}
            <span className="text-gray-500 ">3-4 days, $39.00</span>
          </p>
        </div>
      </div>
      <div>
        <div className="lg:grid lg:grid-cols-4 mt-10 gap-x-4 mb-[60px] sm:px-4 lg:px-0">
          <div>
            <h2 className="uppercase font-semibold text-xs mb-3">
              Related Product
            </h2>
            <div className="lg:flex lg:flex-col lg:gap-y-3 sm:grid sm:grid-cols-2 sm:gap-3">
              {loading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="bg-gray-200 animate-pulse rounded-sm h-20 mb-1 rounded-sm"
                    ></div>
                  ))
                : dataRelated &&
                  dataRelated.length > 0 &&
                  dataRelated
                    .slice(0, 3)
                    .map((product) => (
                      <RelatedProductItem
                        key={product._id}
                        data={product}
                      ></RelatedProductItem>
                    ))}
            </div>
          </div>
          <div className="sm:hidden lg:block">
            <h2 className="uppercase font-semibold text-xs mb-3">
              Product Accessories
            </h2>
            <div className="flex flex-col gap-y-3">
              {loading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="bg-gray-200 animate-pulse rounded-sm h-20 mb-1 rounded-sm"
                    ></div>
                  ))
                : screenWidth >= 400 &&
                  screenWidth <= 600 &&
                  dataRelated &&
                  dataRelated.length > 0
                ? dataRelated.map((product) => (
                    <RelatedProductItem
                      key={product._id}
                      data={product}
                    ></RelatedProductItem>
                  ))
                : dataRelated
                    .slice(3, 6)
                    .map((product) => (
                      <RelatedProductItem
                        key={product._id}
                        data={product}
                      ></RelatedProductItem>
                    ))}
            </div>
          </div>
          <div className="sm:hidden lg:block">
            <h2 className="uppercase font-semibold text-xs mb-3">
              Product SmartPhone
            </h2>
            <div className="flex flex-col gap-y-3">
              {loading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="bg-gray-200 animate-pulse rounded-sm h-20 mb-1 rounded-sm"
                    ></div>
                  ))
                : dataRelated &&
                  dataRelated.length > 0 &&
                  dataRelated
                    .slice(6, 9)
                    .map((product) => (
                      <RelatedProductItem
                        key={product._id}
                        data={product}
                      ></RelatedProductItem>
                    ))}
            </div>
          </div>
          <div className="sm:hidden lg:block">
            <h2 className="uppercase font-semibold text-xs mb-3">
              Featured Products
            </h2>
            <div className="flex flex-col gap-y-3">
              {loading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="bg-gray-200 animate-pulse rounded-sm h-20 mb-1 rounded-sm"
                    ></div>
                  ))
                : dataRelated &&
                  dataRelated.length > 0 &&
                  dataRelated
                    .slice(9, 12)
                    .map((product) => (
                      <RelatedProductItem
                        key={product._id}
                        data={product}
                      ></RelatedProductItem>
                    ))}
            </div>
          </div>
        </div>
      </div>
      {createPortal(
        <ToastContainer limit={1} containerId={"toast-detailProduct"} />,
        document.body
      )}
    </div>
  );
}

export default ProductDetailPage;
