import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { TbShoppingBagEdit } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { handleDeleteCurrentProduct, handleGetAllProduct } from "../redux/request";
import {
  handleSetAllProduct,
  handleShowManageProduct,
} from "../redux/slices/manageSlice";
import ManageProductModal from "./ManageProductModal";
function ManageProducts() {
  const dispatch = useDispatch();
  const [productIdEdit, setProductIdEdit] = useState("");
  const [typeManage, setTypeManage] = useState("add product");
  const { allProduct } = useSelector((state) => state.manage);
  useEffect(() => {
    dispatch(handleGetAllProduct()).then((data) => {
      dispatch(handleSetAllProduct(data.payload.products));
    });
  }, [dispatch]);
  // Handle delete product
  const handleDeleteProduct = (idProduct) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Product has been deleted.",
            icon: "success",
          });
          await dispatch(handleDeleteCurrentProduct(idProduct));
          const newDataProduct = await dispatch(handleGetAllProduct());
          dispatch(handleSetAllProduct(newDataProduct?.payload?.products));
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };
  return (
    <div className="min-h-screen bg-slate-50 relative">
      <div className="pt-[80px] px-10">
        <div className="flex justify-between mb-5 items-center">
          <h3 className="text-2xl font-medium">Products</h3>
          <button
            className="bg-green-400 px-2 py-1 rounded-sm text-white font-medium transition-all hover:bg-green-500"
            onClick={() => {
              dispatch(handleShowManageProduct(true));
              setTypeManage("add product");
            }}
          >
            Add product
          </button>
        </div>
        <table className="w-full bg-white ">
          <tr>
            <th>Product</th>
            <th>Name</th>
            <th>Selling Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
          {allProduct?.length > 0 &&
            allProduct.map((product) => {
              return (
                <tr key={product._id}>
                  <td>
                    <div className="flex justify-center">
                      <img
                        src={product?.listImage[0]}
                        alt="image product"
                        className="w-[80px] h-[80px] object-cover"
                      />
                    </div>
                  </td>
                  <td className="truncate max-w-[180px]">{product?.name}</td>
                  <td>{product?.sellingPrice}$</td>
                  <td>{product?.category}</td>
                  <td>
                    <div className="flex items-center justify-center gap-x-4">
                      <TbShoppingBagEdit
                        className="w-5 h-5 cursor-pointer"
                        onClick={() => {
                          setTypeManage("edit product");
                          setProductIdEdit(product?._id);
                          dispatch(handleShowManageProduct(true));
                        }}
                      />
                      <AiOutlineDelete
                        className="w-5 h-5 cursor-pointer"
                        onClick={() => handleDeleteProduct(product?._id)}
                      />
                    </div>
                    
                  </td>
                </tr>
              );
            })}
        </table>
      </div>
      <ManageProductModal type={typeManage} productIdEdit={productIdEdit} />
    </div>
  );
}

export default ManageProducts;
