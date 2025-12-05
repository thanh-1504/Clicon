import { FiBox } from "react-icons/fi";

import { LuUserRound } from "react-icons/lu";
import { NavLink, Outlet } from "react-router";
function AdminPage() {
  window.scrollTo(0, 0);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="flex items-start">
      <aside className="w-[18%] min-h-screen pt-[80px]">
        <div className="flex items-center gap-x-3 pl-6">
          <img
            src={currentUser?.userPicture || "/images/userPicture.jpg"}
            alt="image admin"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="text-base">{currentUser.displayName}</span>
            <span className="text-sm">{currentUser.email}</span>
          </div>
        </div>
        <hr className="my-4" />
        <NavLink
          to={"/manage/products"}
          className={({ isActive }) =>
            isActive
              ? "flex items-center pl-6 gap-x-2 p-2 cursor-pointer bg-gray-100"
              : "flex items-center pl-6 gap-x-2 p-2 hover:cursor-pointer hover:bg-gray-100"
          }
        >
          <FiBox />
          <span className="text-base">Products</span>
        </NavLink>
        <NavLink
          to={"/manage/users"}
          className={({ isActive }) =>
            isActive
              ? "flex items-center pl-6 gap-x-2 p-2 cursor-pointer bg-gray-100"
              : "flex items-center pl-6 gap-x-2 p-2 hover:cursor-pointer hover:bg-gray-100"
          }
        >
          <LuUserRound />
          <span className="text-base">Users</span>
        </NavLink>
      </aside>
      <div className="w-[82%]">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminPage;
