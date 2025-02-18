import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { FcAddImage } from "react-icons/fc";
import { IoIosClose } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { handleUploadImageToCloud } from "../common/uploadImageToCloud";
import {
  handleCreateProduct,
  handleEditProduct,
  handleGetAllProduct,
} from "../redux/request";
import {
  handleSetAllProduct,
  handleShowManageProduct,
} from "../redux/slices/manageSlice";
import ProgressBar from "./ProgressBar";
const schema = yup.object({
  productName: yup.string().required("Product name is required!"),
  description: yup.string().default(""),
});
// eslint-disable-next-line react/prop-types
function ManageProductModal({ type, productIdEdit }) {
  const dispatch = useDispatch();
  const [imageProductList, setImageProductList] = useState([]);
  const [imgListUpload, setImgListUpload] = useState([]);
  const [progressList, setProgressList] = useState([]);
  const { showModalMangeProduct, allProduct } = useSelector(
    (state) => state.manage
  );
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema), mode: "onSubmit" });
  // Handle add product
  const handleManageProduct = async (data) => {
    console.log(data);
    if (imgListUpload.length === 0) {
      toast.error("Please provide product images", {
        autoClose: 1500,
        pauseOnHover: false,
        containerId: "toast-product",
        position: "top-center",
      });
      return;
    }
    if (isValid) {
      const urlList = await Promise.all(
        imgListUpload.map(async (image) => {
          const urlImg = await handleUploadImageToCloud(image);
          return urlImg?.url;
        })
      );
      if (type === "add product") {
        const dataResponse = await dispatch(
          handleCreateProduct({
            name: data.productName,
            price: data.price,
            brand: data.brand,
            category: data.category,
            sellingPrice: data.sellingPrice,
            description: data.description,
            listImage: urlList,
          })
        );
        if (dataResponse?.payload?.status === "success") {
          toast.success("Create successful products", {
            autoClose: 1500,
            pauseOnHover: false,
            containerId: "toast-product",
            position: "top-center",
          });
          const newProduct = dataResponse?.payload?.data.newProduct;
          dispatch(handleSetAllProduct([...allProduct, newProduct]));
          reset();
          setImageProductList([]);
          setProgressList([]);
          setImgListUpload([]);
        }
        if (
          dataResponse?.payload?.response?.data?.message ===
          "Product is existed"
        ) {
          toast.error("Product is existed", {
            autoClose: 1500,
            pauseOnHover: false,
            containerId: "toast-product",
            position: "top-center",
          });
          return;
        }
      } else {
        const dataResponse = await dispatch(
          handleEditProduct({
            productIdEdit,
            data: {
              name: data.productName,
              category: data.category,
              price: data.price,
              brand: data.brand,
              sellingPrice: data.sellingPrice,
              description: data.description,
              listImage: urlList,
            },
          })
        );
        if (dataResponse?.payload?.data?.status === "success") {
          toast.success("Edit successfully", {
            autoClose: 1500,
            pauseOnHover: false,
            position: "top-center",
            containerId: "toast-product",
          });
          const newProduct = await dispatch(handleGetAllProduct());
          dispatch(handleSetAllProduct(newProduct?.payload?.products));
          reset();
          setProgressList([]);
          setImageProductList([]);
          setImgListUpload([]);
        }
      }
    }
  };
  // Handle upload image
  const handleUploadImage = (e) => {
    if (
      e.target.files &&
      imageProductList.length + e.target.files.length <= 7
    ) {
      const newProgressList = [...progressList];
      const newImgListUpload = [...imgListUpload];
      const imageArray = Array.from(e.target.files).map((file) => {
        newImgListUpload.push(file);
        return URL.createObjectURL(file);
      });
      setImgListUpload(newImgListUpload);
      setValue("productImage", newImgListUpload);
      setImageProductList((prev) => prev.concat(imageArray));
      imageArray.forEach(() => newProgressList.push(0));
      setProgressList(newProgressList);
      for (let index = 0; index < newProgressList.length; index++) {
        if (newProgressList[index] === 100) continue;
        const interval = setInterval(() => {
          setProgressList((prevProgressList) => {
            const updatedProgress = [...prevProgressList];
            if (updatedProgress[index] > 100) {
              updatedProgress[index] = 100;
              clearInterval(interval);
              return updatedProgress;
            }
            updatedProgress[index] += Math.floor(Math.random() * 100) + 1;
            return updatedProgress;
          });
        }, 1000);
      }
    } else {
      toast.error("You only get upload up to 7 product photos", {
        autoClose: 1500,
        pauseOnHover: false,
        containerId: "toast-product",
        position: "top-center",
      });
      return;
    }
    e.target.value = "";
  };
  // Handle remove image
  const handleRemoveImage = (index) => {
    const imageProductListFilter = imageProductList.filter(
      (_, indexImage) => indexImage !== index
    );
    const progressListFilter = progressList.filter(
      (_, indexItemProgress) => indexItemProgress !== index
    );
    const imgListUploadFilter = imgListUpload.filter(
      (_, indexImg) => indexImg !== index
    );
    setImageProductList(imageProductListFilter);
    setImgListUpload(imgListUploadFilter);
    setTimeout(() => {
      setProgressList(progressListFilter);
    }, 680);
  };
  return (
    <>
      {createPortal(
        <div
          className={`modal fixed inset-0 z-[999] bg-[rgba(0,0,0,0.4)] flex justify-center items-center transition-all ease duration-200 ${
            showModalMangeProduct
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }`}
        >
          <div className="modal-user min-w-[747px] ">
            <div className="flex items-center justify-between bg-[#1e6593] rounded-t-md px-6 h-10">
              <h2 className="text-white font-medium text-xl">
                {type === "add product" ? "Add a new product" : "Edit product"}
              </h2>
              <IoIosClose
                className="w-8 h-8 text-white cursor-pointer"
                onClick={() => {
                  reset();
                  clearErrors();
                  setImageProductList([]);
                  setProgressList([]);
                  dispatch(handleShowManageProduct(false));
                }}
              />
            </div>
            <form
              onSubmit={handleSubmit(handleManageProduct)}
              className="bg-white px-5 rounded-b-md pt-4 max-h-[500px] overflow-y-scroll frm_addproduct scroll-smooth"
            >
              <div className="flex flex-col gap-y-2">
                <label>Product name</label>
                <input
                  type="text"
                  id="name"
                  placeholder={
                    type === "add product"
                      ? "Type product name"
                      : "Type editing information"
                  }
                  {...register("productName")}
                  className="w-full outline-none border-2 border-slate-200 px-2 py-1 placeholder:text-sm focus:border-blue-500 transition-all ease-linear duration-200"
                />
                {errors?.productName?.message && (
                  <p className="text-red-400 text-sm">
                    {errors.productName.message}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-x-2 my-2">
                <div className="flex flex-col gap-y-2 w-2/4">
                  <label>Price</label>
                  <input
                    type="number"
                    id="text"
                    min={0}
                    max={100000}
                    {...register("price")}
                    placeholder="The default price is $100"
                    className="w-full outline-none border-2 border-slate-200 px-2 py-1 placeholder:text-sm focus:border-blue-500 transition-all ease-linear duration-200"
                  />
                </div>
                <div className="flex flex-col gap-y-2 w-2/4">
                  <label>Selling Price</label>
                  <input
                    type="number"
                    id="text"
                    min={0}
                    max={100000}
                    {...register("sellingPrice")}
                    placeholder="The default selling price is $100"
                    className="w-full outline-none border-2 border-slate-200 px-2 py-1 placeholder:text-sm focus:border-blue-500 transition-all ease-linear duration-200"
                  />
                </div>
              </div>
              <div className="flex items-center gap-x-2 my-2">
                <div className="flex flex-col gap-y-2 w-2/4">
                  <label>Brand</label>
                  <input
                    type="text"
                    id="text"
                    {...register("brand")}
                    placeholder="Type brand product"
                    className="w-full outline-none border-2 border-slate-200 px-2 py-1 placeholder:text-sm focus:border-blue-500 transition-all ease-linear duration-200"
                  />
                </div>
                <div className="flex flex-col gap-y-2 w-2/4">
                  <label>Product category</label>
                  <select
                    {...register("category")}
                    className="outline-none border-2 border-slate-200 py-1 w-full "
                  >
                    <option value="computer,laptop">Computer - Laptop</option>
                    <option value="phone">Smartphone</option>
                    <option value="headphone">Headphone</option>
                    <option value="accessories">Accessories</option>
                    <option value="camera">Camera</option>
                    <option value="tv">TV, Homes</option>
                  </select>
                </div>
              </div>
              <label>Product image</label>
              <div className="flex items-start mt-2 gap-x-2">
                <div className="bg-slate-200 w-[80px] h-[80px]">
                  <label
                    htmlFor="productImageInput"
                    className="flex justify-center items-center w-full h-full flex-col hover:cursor-pointer"
                  >
                    <FcAddImage className="w-9 h-9" />
                    <span className="text-xs">Upload</span>
                  </label>
                  <input
                    type="file"
                    multiple
                    id="productImageInput"
                    className="hidden"
                    {...register("productImage", {
                      required: true,
                      onChange: handleUploadImage,
                    })}
                  />
                </div>
                <div className="flex items-start gap-x-2 select-none">
                  {imageProductList?.length > 0 &&
                    imageProductList.map((image, index) => {
                      return (
                        <div
                          key={index}
                          className="bg-slate-200 w-[80px] h-[80px] flex items-center justify-center relative"
                        >
                          {progressList[index] === 100 ? (
                            <>
                              <img
                                src={image}
                                className="w-[80px] h-[80px] object-cover"
                                alt="image product"
                              />
                              <IoCloseOutline
                                className="w-5 h-5 absolute right-1 top-1 cursor-pointer"
                                onClick={() => {
                                  handleRemoveImage(index);
                                }}
                              />
                            </>
                          ) : (
                            <ProgressBar
                              progress={progressList[index]}
                            ></ProgressBar>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="flex flex-col gap-y-2 mt-2">
                <label>Product description</label>
                <textarea
                  placeholder="Type description product"
                  {...register("description")}
                  className="description w-full text-sm outline-none border-2 p-2 min-h-[100px] border-slate-200"
                ></textarea>
                {errors?.description?.message && (
                  <p className="text-red-400 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div className="flex justify-center mt-3 pb-3">
                <button className="bg-green-400 text-white font-medium min-w-[100px] h-10 rounded hover:bg-green-500 transition-all">
                  {type === "add product" ? "Add" : "Edit"}
                </button>
              </div>
            </form>
          </div>
          <ToastContainer
            limit={1}
            containerId={"toast-product"}
          ></ToastContainer>
        </div>,
        document.body
      )}
    </>
  );
}

export default ManageProductModal;
