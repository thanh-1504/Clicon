import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { IoIosClose } from "react-icons/io";
import { IoCameraOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { convertImgToBase64 } from "../common/convertImgToBase64";
import { handleUploadImageToCloud } from "../common/uploadImageToCloud";
import {
  handleCreateNewUser,
  handleEditUser,
  handleGetAllUsers,
} from "../redux/request";
import {
  handleSetDataAllUsers,
  handleShowModalAddUser,
} from "../redux/slices/manageSlice";
const schema = yup.object({
  name: yup.string().required("Please enter your name!"),
  email: yup
    .string()
    .email("Invalid email!")
    .required("Please enter your email!"),
  password: yup
    .string()
    .required("Please enter your password!")
    .min(6, "Password must be at least 6 characters"),
});
// eslint-disable-next-line react/prop-types
function AddUserModal({ type, userIdEdit }) {
  const dispatch = useDispatch();
  const [imgUser, setImgUser] = useState("");
  const { showModalAddUser } = useSelector((state) => state.manage);
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    clearErrors,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });
  const { allUsers } = useSelector((state) => state.manage);
  // Handle submit form create user
  const handleSubmitFormCreateUser = async (data) => {
    if (isValid) {
      const imageUser = data?.userPicture?.name
        ? await handleUploadImageToCloud(data.userPicture)
        : "";
      if (type === "add user") {
        const dataRequest = {
          ...data,
          userPicture: imageUser?.url,
        };
        const dataResponse = await dispatch(handleCreateNewUser(dataRequest));
        if (
          dataResponse?.payload?.response?.data.message.startsWith(
            "E11000 duplicate key"
          )
        ) {
          toast.error("Email already exists", {
            pauseOnHover: false,
            autoClose: 1000,
            position: "top-center",
            containerId: "toast-user",
          });
          return;
        } else {
          toast.success("Create user successfully", {
            pauseOnHover: false,
            autoClose: 1000,
            position: "top-center",
            containerId: "toast-user",
          });
          const newUser = dataResponse?.payload?.data;
          dispatch(handleSetDataAllUsers([...allUsers, newUser]));
          setImgUser("");
          reset();
        }
      } else {
        const dataEditResponse = await dispatch(
          handleEditUser({
            userId: userIdEdit,
            displayName: data.name,
            email: data.email,
            password: data.password,
            userPhoto: imageUser?.url,
          })
        );
        if (dataEditResponse?.payload?.status === "success") {
          toast.success("Edit successfully", {
            pauseOnHover: false,
            autoClose: 1000,
            position: "top-center",
            containerId: "toast-user",
          });
          const newDataUser = await dispatch(handleGetAllUsers());
          await dispatch(handleSetDataAllUsers(newDataUser?.payload?.data));
          reset();
        }
      }
    }
  };
  return (
    <>
      {createPortal(
        <div>
          <div
            className={`modal fixed inset-0 z-[999] bg-[rgba(0,0,0,0.4)] flex justify-center items-center transition-all ease duration-200 ${
              showModalAddUser ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          >
            <div className="modal-user min-w-[400px]">
              <div className="flex items-center justify-between bg-[#1e6593] rounded-t-md px-6 h-10">
                <h2 className="text-white font-medium text-xl">
                  {type === "add user" ? "Add a new user" : "Edit user"}
                </h2>
                <IoIosClose
                  className="w-8 h-8 text-white cursor-pointer"
                  onClick={() => {
                    dispatch(handleShowModalAddUser(false));
                    clearErrors();
                    setTimeout(() => {
                      setImgUser("");
                    }, 500);
                  }}
                />
              </div>
              <form
                className="bg-white px-5 rounded-b-md pt-8"
                onSubmit={handleSubmit(handleSubmitFormCreateUser)}
              >
                <div className="flex flex-col items-center gap-y-1 justify-center relative">
                  <div className="relative">
                    <img
                      src={`${imgUser}` || "/images/userPicture.jpg"}
                      alt="user photo"
                      className="w-[80px] h-[80px] rounded-full object-cover shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                    />
                    <label
                      htmlFor="upload-photo-user"
                      className="absolute inset-0 rounded-full  hover:bg-[rgba(0,0,0,0.4)] opacity-100 transition-all hover:cursor-pointer"
                    >
                      <div className="opacity-0 hover:opacity-100 w-full h-full flex flex-col items-center justify-center">
                        <IoCameraOutline className="w-8 h-8 text-white" />
                        <span className="text-xs text-white">Update</span>
                      </div>
                    </label>
                    <input
                      type="file"
                      id="upload-photo-user"
                      className="hidden"
                      {...register("userPicture")}
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        setValue("userPicture", file);
                        const imgBase64 = await convertImgToBase64(file);
                        setImgUser(imgBase64);
                        e.target.value = "";
                      }}
                    />
                  </div>
                  <span>Upload user photo</span>
                </div>
                <div className="flex flex-col gap-y-2">
                  <label>Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter username"
                    {...register("name")}
                    className="w-full outline-none border-2 border-slate-200 px-2 py-1 placeholder:text-sm focus:border-blue-500 transition-all ease-linear duration-200"
                  />
                  {errors?.name?.message && (
                    <span className="text-red-500 text-sm">
                      {errors.name.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-y-2 my-2">
                  <label>Email</label>
                  <input
                    type="text"
                    id="email"
                    placeholder="Enter email"
                    {...register("email")}
                    className="w-full outline-none border-2 border-slate-200 px-2 py-1 placeholder:text-sm focus:border-blue-500  transition-all ease-linear duration-200"
                  />
                  {errors?.email?.message && (
                    <span className="text-red-500 text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-y-2">
                  <label>Password</label>
                  <input
                    type="password"
                    id="password"
                    {...register("password")}
                    placeholder="Enter password"
                    className="w-full outline-none border-2 border-slate-200 px-2 py-1 placeholder:text-sm focus:border-blue-500 transition-all ease-linear duration-200"
                  />
                  {errors?.password?.message && (
                    <span className="text-red-500 text-sm">
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <div className="flex justify-center mt-8 pb-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-green-400 text-white font-medium min-w-[100px] h-10 rounded hover:bg-green-500 transition-all relative"
                  >
                    {isSubmitting ? (
                      <div className="w-full h-full flex items-center justify-center ">
                        <span className="w-5 h-5 rounded-full border-b-2  border-white animate-spin"></span>
                      </div>
                    ) : type === "edit user" ? (
                      "Edit"
                    ) : (
                      "Add"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <ToastContainer limit={1} containerId={"toast-user"} />
        </div>,
        document.body
      )}
    </>
  );
}

export default AddUserModal;
