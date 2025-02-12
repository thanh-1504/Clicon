import { useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { MdManageAccounts, MdOutlineAdminPanelSettings } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import { handleSignOut } from "../redux/request";
import { handleShowAccountSetting } from "../redux/slices/accountSlice";
import AccountSetting from "./AccountSetting";
import LogoWeb from "./LogoWeb";
import ShoppingCart from "./ShoppingCart";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [loadingSignOut, setLoadingSignOut] = useState(false);
  const { data } = useSelector((state) => state.cart);
  const [showShoppingCart, setShowShoppingCart] = useState(false);
  const userInformation = JSON.parse(localStorage.getItem("user"));
  const { showAccountSetting } = useSelector((state) => state.account);
  // Handle sign out
  const handleSignOutAccount = async () => {
    setLoadingSignOut(true);
    await dispatch(handleSignOut());
    localStorage.removeItem("user");
    setTimeout(() => {
      setLoadingSignOut(false);
      navigate("/");
    }, 1000);
  };
  return (
    <header
      className={`mx-auto bg-main-color w-full h-[65px] fixed ${
        showAccountSetting ? "z-[99]" : "z-[999]"
      }`}
    >
      <div className="flex justify-between items-center h-full px-5">
        <LogoWeb />
        {!location.pathname.startsWith("/manage") && (
          <div className="w-[38%] relative sm:hidden lg:block">
            <input
              type="search"
              className="w-full outline-none pl-2 pr-8 py-2 text-sm rounded-sm"
              placeholder="Search for anything..."
            />
            <IoIosSearch className="absolute right-2 bottom-2/4 translate-y-2/4 cursor-pointer w-5 h-5 " />
          </div>
        )}
        <div>
          {userInformation?.displayName ? (
            <div className="flex items-center gap-x-5">
              {location.pathname !== "/cart" && (
                <div
                  className="relative"
                  onMouseEnter={() => {
                    setShowShoppingCart(true);
                  }}
                  onMouseLeave={() => setShowShoppingCart(false)}
                >
                  <div className="py-2">
                    <BsCart2 className="w-6 h-6 cursor-pointer" fill="#fff" />
                  </div>
                  <span className="absolute bg-white rounded-full text-main-color border border-main-color font-semibold flex items-center justify-center top-0 -right-3 w-5 h-5 text-sm hover:cursor-pointer">
                    {data?.length}
                  </span>
                  <ShoppingCart
                    show={showShoppingCart}
                    setShow={setShowShoppingCart}
                  />
                </div>
              )}
              <div className="relative">
                <img
                  src={`${
                    userInformation.userPicture
                      ? userInformation.userPicture
                      : "/images/userPicture.jpg"
                  }`}
                  alt="user photo"
                  className="w-8 h-8 rounded-full cursor-pointer"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                />
                <div
                  className={`absolute user-menu min-w-[376px] bg-white right-0 shadow-xl rounded-lg select-none transition-all duration-150 ${
                    showUserMenu
                      ? "mt-[6px] visible opacity-100"
                      : "mt-0 invisible opacity-0"
                  }`}
                >
                  <div className="flex items-center px-5 py-4 gap-x-3">
                    <img
                      src={`${
                        userInformation.userPicture
                          ? userInformation.userPicture
                          : "/images/userPicture.jpg"
                      }`}
                      alt="user photo"
                      className="w-9 h-9 rounded-full "
                    />
                    <span className="text-sm">
                      {userInformation.displayName}
                    </span>
                  </div>
                  <hr />
                  <div
                    className="flex items-center px-5 py-4 gap-x-3 cursor-pointer hover:bg-gray-100 transition-all"
                    onClick={() => {
                      setShowUserMenu(false);
                      dispatch(handleShowAccountSetting(true));
                    }}
                  >
                    <MdManageAccounts className="min-w-10" />
                    <span className="text-sm">Account</span>
                  </div>
                  {userInformation?.role === "ADMIN" && (
                    <Link
                      to={"/manage/products"}
                      className="flex items-center px-5 py-4 gap-x-3 cursor-pointer hover:bg-gray-100 transition-all"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <MdOutlineAdminPanelSettings className="min-w-10" />
                      <span className="text-sm">Adminator</span>
                    </Link>
                  )}

                  <div
                    className="flex items-center px-5 py-4 gap-x-3 cursor-pointer hover:bg-gray-100 transition-all"
                    onClick={handleSignOutAccount}
                  >
                    <div className="flex items-center gap-x-3">
                      {loadingSignOut ? (
                        <div className="min-w-10">
                          <div className="w-4 h-4 rounded-full border border-t border-t-black border-b-transparent border-l-transparent border-r-transparent animate-spin mx-auto"></div>
                        </div>
                      ) : (
                        <IoLogOutOutline className="min-w-10" />
                      )}
                      <span className="text-sm">Sign out</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-white">
              <Link to={"/sign-in"} className="cursor-pointer">
                Sign in
              </Link>
              <span className="mx-2">|</span>
              <Link to={"/sign-up"} className="cursor-pointer">
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
      {showAccountSetting && <AccountSetting />}
    </header>
  );
}

export default Header;
