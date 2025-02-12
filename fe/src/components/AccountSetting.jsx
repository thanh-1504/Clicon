import { createPortal } from "react-dom";
import { IoIosClose } from "react-icons/io";
import { MdAccountCircle, MdOutlineSecurity } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  handleShowAccountSetting,
  handleShowAccountSettingUpdate,
  handleShowUpdatePassword,
  handleShowUpdateProfile,
  handleShowUpdateUserName,
  handleUpdateImageUser,
} from "../redux/slices/accountSlice";
import AccountUpdate from "./AccountUpdate";
// eslint-disable-next-line react/prop-types
function AccountSetting() {
  const dispatch = useDispatch();
  const userInformation = JSON.parse(localStorage.getItem("user"));
  const {
    accountSettingUpdate,
    showUpdateProfile,
    showUpdateUserName,
    showUpdatePassword,
  } = useSelector((state) => state.account);
  const isSignInWithGoogle = JSON.parse(
    localStorage.getItem("user")
  )?.signInWithGoogle;
  return (
    <>
      {createPortal(
        <div className="fixed inset-0 z-[999] bg-[rgba(0,0,0,0.4)] flex justify-center items-center modal py-10">
          <div className="modal-account-content bg-white relative flex items-start min-w-[800px] h-full rounded-lg">
            <IoIosClose
              className="absolute right-5 w-8 h-8 top-4 cursor-pointer"
              onClick={() => {
                dispatch(handleShowAccountSetting(false));
                dispatch(handleShowUpdateProfile(false));
                dispatch(handleShowUpdateUserName(false));
                dispatch(handleShowUpdatePassword(false));
                dispatch(handleShowAccountSettingUpdate(true));
                dispatch(handleUpdateImageUser(""));
              }}
            />
            <aside
              className={`sidebar-account px-3 border-r bg-gray-100 py-5 rounded-l-lg w-[40%] h-full`}
            >
              <div className="flex flex-col">
                <div className="mb-4 px-3">
                  <h2 className="text-2xl font-semibold">Account</h2>
                  <span className="text-gray-500 text-sm">
                    Manage your account info.
                  </span>
                </div>
                <div
                  onClick={() => {
                    dispatch(handleShowAccountSettingUpdate(true));
                    dispatch(handleShowUpdatePassword(false));
                  }}
                  className={`flex items-center gap-x-2 py-2 rounded cursor-pointer my-[2px] pl-3 transition-all ${
                    accountSettingUpdate
                      ? "bg-gray-200"
                      : "hover:bg-gray-100 opacity-30"
                  }`}
                >
                  <MdAccountCircle />
                  <span className="text-sm ">Profile</span>
                </div>
                <div
                  onClick={() =>
                    dispatch(handleShowAccountSettingUpdate(false))
                  }
                  className={`flex items-center gap-x-2  py-2 rounded cursor-pointer transition-all pl-3 ${
                    accountSettingUpdate
                      ? "hover:bg-gray-100 opacity-30"
                      : "bg-gray-200"
                  }`}
                >
                  <MdOutlineSecurity />
                  <span className="text-sm">Security</span>
                </div>
              </div>
            </aside>
            {accountSettingUpdate ? (
              <div className="py-6 w-full pl-5 pr-[55px] max-h-[450px] overflow-y-auto no-scrollbar">
                <h3 className="font-semibold ">Profile details</h3>
                <hr className="w-full mt-3 mb-5" />
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="min-w-[135px]">Profile</span>
                    <div
                      className={`flex gap-x-3 items-center  ${
                        showUpdateProfile && "opacity-0 invisible absolute"
                      } `}
                    >
                      <img
                        className="w-10 h-10 rounded-full object-cover"
                        src={
                          userInformation?.userPicture ||
                          "/images/userPicture.jpg"
                        }
                        alt="user picture"
                      />
                      <span>{userInformation?.displayName}</span>
                    </div>
                    <button
                      className={`hover:bg-gray-100 py-1 px-2 rounded ${
                        showUpdateProfile && "opacity-0 invisible absolute"
                      }`}
                      onClick={() => dispatch(handleShowUpdateProfile(true))}
                    >
                      Update profile
                    </button>
                    <AccountUpdate
                      type="user photo"
                      controller={{
                        showUpdateProfile,
                        handleShowUpdateProfile,
                      }}
                      userInformation={userInformation}
                    ></AccountUpdate>
                  </div>
                </div>
                <hr className="my-5" />
                <div className="flex items-center justify-between text-sm">
                  <span
                    className={`min-w-[165px] ${
                      showUpdateUserName && "invisible absolute opacity-0"
                    }`}
                  >
                    Username
                  </span>
                  <span
                    className={`min-w-[120px] ${
                      showUpdateUserName && "invisible opacity-0 absolute"
                    }`}
                  >
                    {userInformation?.displayName}
                  </span>
                  <button
                    className="hover:bg-gray-100 py-1 px-2 rounded"
                    onClick={() => dispatch(handleShowUpdateUserName(true))}
                  >
                    Update username
                  </button>
                  <AccountUpdate
                    type="update username"
                    controller={{
                      showUpdateUserName,
                      handleShowUpdateUserName,
                    }}
                  ></AccountUpdate>
                </div>
                <hr className="my-5" />

                <div className="flex items-center text-sm justify-between">
                  <span className="min-w-[150px]">Email addresses</span>
                  <span className="min-w-[230px]">
                    {userInformation?.email}
                  </span>
                  <span></span>
                </div>
              </div>
            ) : (
              <div className="py-6 w-full pl-5 pr-[55px] max-h-[450px] overflow-y-auto no-scrollbar">
                <h3 className="font-semibold ">Security</h3>
                <hr className="w-full mt-3 mb-5" />
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="min-w-[135px]">Password</span>
                    <button
                      title={`${
                        isSignInWithGoogle &&
                        "Can't change password with google account"
                      }`}
                      disabled={isSignInWithGoogle}
                      className={`${
                        !isSignInWithGoogle && "hover:bg-gray-100"
                      } py-1 px-2 rounded ${
                        showUpdatePassword && "opacity-0 invisible absolute"
                      } ${
                        isSignInWithGoogle &&
                        "opacity-60 bg-slate-400 text-white"
                      }`}
                      onClick={() => dispatch(handleShowUpdatePassword(true))}
                    >
                      Update password
                    </button>
                    <AccountUpdate
                      type="update password"
                      controller={{
                        showUpdatePassword,
                        handleShowUpdatePassword,
                      }}
                    ></AccountUpdate>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
{
  /* document.querySelector(".main-content") */
}

export default AccountSetting;
