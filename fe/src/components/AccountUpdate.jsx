/* eslint-disable react/prop-types */
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { convertImgToBase64 } from "../common/convertImgToBase64";
import { handleUpdateUser } from "../redux/request";
import {
  handleGetDataUpdateUser,
  handleShowConfirmPassword,
  handleShowPassword,
  handleUpdateImageUser,
  setLoadingUpdatePassword,
  setLoadingUpdateUserName,
  setLoadingUpdateUserPhoto,
} from "../redux/slices/accountSlice";
const schema = yup.object({
  password: yup
    .string()
    .required("Please enter your password!")
    .min(6, "Password must be at least 6 characters"),
  passwordConfirm: yup
    .string()
    .required("Please enter your password confirm!")
    .oneOf(
      [yup.ref("password"), null],
      "Password confirmation must match the password"
    ),
});
// eslint-disable-next-line react/prop-types
function AccountUpdate({ type, userInformation, ...rest }) {
  const dispatch = useDispatch();
  const inputUserNameRef = useRef();
  const {
    showUpdateProfile,
    showUpdateUserName,
    showUpdatePassword,
    handleShowUpdateProfile,
    handleShowUpdateUserName,
    handleShowUpdatePassword,
  } = rest.controller;
  const {
    showPassword,
    showConfirmPassword,
    imgUserBase64,
    isUpdateImageUser,
    dataUpdateUser,
    loadingUpdateUserPhoto,
    loadingUpdateUserName,
    loadingUpdatePassword,
  } = useSelector((state) => state.account);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema) });
  const handleChangePassword = async () => {
    if (isValid) {
      dispatch(setLoadingUpdatePassword(true));
      await dispatch(handleUpdateUser(dataUpdateUser));
      dispatch(setLoadingUpdatePassword(false));
    }
  };
  return (
    <>
      {type === "user photo" ? (
        <div
          className={`update-profile transition-all ease duration-200 ${
            showUpdateProfile
              ? "opacity-100 visible min-w-[315px] bg-white shadow border rounded-lg p-4"
              : "opacity-0 invisible absolute top-0"
          }`}
        >
          <h4
            className={`mb-4 font-semibold text-sm ${
              !showUpdateProfile && "hidden"
            }`}
          >
            Update profile
          </h4>
          <div
            className={`flex items-center gap-x-3 mb-3 ${
              !showUpdateProfile && "hidden"
            }`}
          >
            <img
              src={
                dataUpdateUser?.userPhoto
                  ? dataUpdateUser?.userPhoto
                  : imgUserBase64 ||
                    userInformation?.userPicture ||
                    "/images/userPicture.jpg"
              }
              alt="user photo"
              className="w-10 h-10 rounded-full"
            />
            <input
              type="file"
              id="user photo input"
              className="hidden"
              onChange={async (e) => {
                const fileImg = await convertImgToBase64(e.target.files[0]);
                dispatch(
                  handleUpdateImageUser({ fileImg, updateImgUser: true })
                );
                dispatch(
                  handleGetDataUpdateUser({
                    ...dataUpdateUser,
                    userPhoto: fileImg,
                  })
                );
                e.target.value = "";
              }}
            />
            <label
              htmlFor="user photo input"
              className="bg-white border px-2 py-[2px] text-sm rounded shadow cursor-pointer hover:bg-gray-200 transition-all"
            >
              Upload
            </label>
            {isUpdateImageUser && (
              <button
                className="text-red-500 px-2 py-[2px] transition-all  hover:bg-slate-100"
                onClick={() => {
                  dispatch(
                    handleUpdateImageUser({
                      fileImg: null,
                      updateImgUser: false,
                    })
                  );
                  dispatch(
                    handleGetDataUpdateUser({
                      ...dataUpdateUser,
                      userPhoto: null,
                    })
                  );
                }}
              >
                Remove
              </button>
            )}
          </div>
          <div
            className={`ml-auto flex items-center ${
              !showUpdateProfile && "hidden"
            }`}
          >
            <button
              className="px-2 py-[2px] hover:bg-gray-100 transition-all rounded mr-2 text-sm"
              onClick={() => {
                dispatch(handleShowUpdateProfile(false));
                dispatch(
                  handleUpdateImageUser({ fileImg: null, updateImgUser: false })
                );
                dispatch(
                  handleGetDataUpdateUser({
                    ...dataUpdateUser,
                    userPhoto: null,
                  })
                );
              }}
            >
              Cancel
            </button>
            <button
              disabled={loadingUpdateUserPhoto}
              className={` bg-[#9b9b9e] min-w-[52px] min-h-6 text-white rounded text-sm}`}
              onClick={async () => {
                if (dataUpdateUser?.userPhoto) {
                  dispatch(setLoadingUpdateUserPhoto(true));
                  await dispatch(
                    handleUpdateUser({
                      ...dataUpdateUser,
                      userPhoto: dataUpdateUser.userPhoto,
                    })
                  );
                }
                dispatch(setLoadingUpdateUserPhoto(false));
                dispatch(
                  handleUpdateImageUser({ fileImg: null, updateImgUser: false })
                );
              }}
            >
              {loadingUpdateUserPhoto ? (
                <div className="w-4 h-4 mx-auto  border-2 border-t-transparent border-white rounded-full animate-spin"></div>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      ) : type === "update username" ? (
        <div
          className={`update-profile transition-all ease duration-200 ${
            showUpdateUserName
              ? "opacity-100 visible min-w-[315px] bg-white shadow border rounded-lg p-4"
              : "opacity-0 invisible absolute top-0"
          }`}
        >
          <h4
            className={`mb-4 font-semibold text-sm ${
              !showUpdateUserName && "hidden"
            }`}
          >
            Update username
          </h4>
          <div
            className={`flex flex-col gap-y-2 mb-3 ${
              !showUpdateUserName && "hidden"
            }`}
          >
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              ref={inputUserNameRef}
              className="px-2 py-1 rounded outline-none border border-black transition-all focus:shadow-inputShadow"
              onBlur={(e) =>
                dispatch(
                  handleGetDataUpdateUser({
                    ...dataUpdateUser,
                    userName: e.target.value,
                  })
                )
              }
            />
          </div>
          <div
            className={`flex items-center ${!showUpdateUserName && "hidden"}`}
          >
            <button
              className="px-2 py-[2px] hover:bg-gray-100 transition-all rounded mr-2 text-sm"
              onClick={() => {
                dispatch(handleShowUpdateUserName(false));
                inputUserNameRef.current.value = "";
                dispatch(
                  handleGetDataUpdateUser({ ...dataUpdateUser, userName: "" })
                );
              }}
            >
              Cancel
            </button>
            <button
              disabled={loadingUpdateUserName}
              className="bg-[#9b9b9e] min-w-[52px] min-h-6 text-white rounded text-sm"
              onClick={async () => {
                if (dataUpdateUser.userName) {
                  dispatch(setLoadingUpdateUserName(true));
                  await dispatch(
                    handleUpdateUser({
                      ...dataUpdateUser,
                      displayName: dataUpdateUser.userName,
                    })
                  );
                  dispatch(setLoadingUpdateUserName(false));
                }
              }}
            >
              {loadingUpdateUserName ? (
                <div className="w-4 h-4 mx-auto  border-2 border-t-transparent border-white rounded-full animate-spin"></div>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      ) : type === "update password" ? (
        <div
          className={`update-profile transition-all ease duration-200 ${
            showUpdatePassword
              ? "opacity-100 visible min-w-[337px] bg-white shadow border rounded-lg p-4"
              : "opacity-0 invisible absolute top-0"
          }`}
        >
          <h4
            className={`mb-3 font-semibold text-sm ${
              !showUpdatePassword && "hidden"
            }`}
          >
            Update password
          </h4>
          <form
            onSubmit={handleSubmit(handleChangePassword)}
            className={`flex flex-col gap-y-2 mb-3 ${
              !showUpdatePassword && "hidden"
            }`}
          >
            <label htmlFor="password">New password</label>
            <div className="relative">
              <input
                type={`${showPassword ? "text" : "password"}`}
                id="password"
                name="password"
                {...register("password")}
                onBlur={(e) =>
                  dispatch(
                    handleGetDataUpdateUser({
                      ...dataUpdateUser,
                      password: e.target.value,
                    })
                  )
                }
                className="px-2 py-1 pr-8 rounded outline-none border border-black w-full focus:shadow-inputShadow transition-all"
              />
              {!showPassword ? (
                <IoEyeOutline
                  onClick={() => dispatch(handleShowPassword(!showPassword))}
                  className="absolute right-3 bottom-2/4 translate-y-2/4 cursor-pointer"
                />
              ) : (
                <IoEyeOffOutline
                  onClick={() => dispatch(handleShowPassword(!showPassword))}
                  className="absolute right-3 bottom-2/4 translate-y-2/4 cursor-pointer"
                />
              )}
            </div>
            {errors?.password?.message && (
              <p className="text-red-500">{errors.password.message}</p>
            )}

            <label htmlFor="confirmPassword">Confirm password</label>
            <div className="relative">
              <input
                type={`${showConfirmPassword ? "text" : "password"}`}
                id="passwordConfirm"
                name="passwordConfirm"
                {...register("passwordConfirm")}
                className="px-2 py-1 rounded outline-none border border-black focus:shadow-inputShadow  w-full pr-8 transition-all"
              />
              {!showConfirmPassword ? (
                <IoEyeOutline
                  onClick={() =>
                    dispatch(handleShowConfirmPassword(!showConfirmPassword))
                  }
                  className="absolute right-3 bottom-2/4 translate-y-2/4 cursor-pointer"
                />
              ) : (
                <IoEyeOffOutline
                  onClick={() =>
                    dispatch(handleShowConfirmPassword(!showConfirmPassword))
                  }
                  className="absolute right-3 bottom-2/4 translate-y-2/4 cursor-pointer"
                />
              )}
            </div>
            {errors?.passwordConfirm?.message && (
              <p className="text-red-500">{errors.passwordConfirm.message}</p>
            )}
            <div
              className={`flex items-center ${!showUpdatePassword && "hidden"}`}
            >
              <button
                type="button"
                className="px-2 py-[2px] hover:bg-gray-100 transition-all rounded mr-2 text-sm"
                onClick={() => {
                  reset({
                    password: "",
                    passwordConfirm: "",
                  });
                  dispatch(handleShowUpdatePassword(false));
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={` bg-[#9b9b9e] min-w-[52px] min-h-6 text-white rounded text-sm}`}
              >
                {loadingUpdatePassword ? (
                  <div className="w-4 h-4 mx-auto border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
}

export default AccountUpdate;
