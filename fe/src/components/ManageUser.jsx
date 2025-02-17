import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { LiaUserEditSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { handleDeleteUser, handleGetAllUsers } from "../redux/request";
import {
  handleSetDataAllUsers,
  handleShowModalAddUser,
} from "../redux/slices/manageSlice";
import AddUserModal from "./AddUserModal";
function ManageUser() {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const [typeManage, setTypeManage] = useState("add user");
  const [userIdEdit, setUserIdEdit] = useState("");
  const { allUsers } = useSelector((state) => state.manage);
  useEffect(() => {
    dispatch(handleGetAllUsers()).then((data) => {
      dispatch(handleSetDataAllUsers(data?.payload?.data));
    });
  }, [dispatch]);
  return (
    <div className="min-h-screen bg-slate-50 relative">
      <div className="pt-[80px] px-10">
        <div className="flex justify-between mb-5 items-center">
          <h3 className="text-2xl font-medium">Users</h3>
          <button
            className="bg-green-400 px-2 py-1 rounded-sm text-white font-medium transition-all hover:bg-green-500"
            onClick={() => {
              dispatch(handleShowModalAddUser(true));
              setTypeManage("add user");
            }}
          >
            Add user
          </button>
        </div>
        <table className="w-full bg-white ">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
          {allUsers?.length > 0 &&
            allUsers.map((user) => {
              return (
                <tr key={user._id}>
                  <td title={user._id} className="truncate max-w-[80px]">
                    {user._id}
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <div className="flex items-center justify-center gap-x-4">
                      <LiaUserEditSolid
                        className="w-5 h-5 cursor-pointer hover:fill-yellow-600"
                        onClick={() => {
                          dispatch(handleShowModalAddUser(true));
                          setTypeManage("edit user");
                          setUserIdEdit(user._id);
                        }}
                      />
                      <AiOutlineDelete
                        className="w-5 h-5 cursor-pointer hover:fill-red-500 hover:shadow-md hover:rounded-full"
                        onClick={() => {
                          const swalWithBootstrapButtons = Swal.mixin({
                            customClass: {
                              confirmButton: "btn btn-success bg-green-400",
                            },
                            buttonsStyling: true,
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
                                  text: "User has been deleted.",
                                  icon: "success",
                                });
                                await dispatch(handleDeleteUser(user._id));
                                const newDataUser = await dispatch(
                                  handleGetAllUsers()
                                );
                                console.log(newDataUser);
                                dispatch(
                                  handleSetDataAllUsers(
                                    newDataUser?.payload?.data
                                  )
                                );
                              } else if (
                                result.dismiss === Swal.DismissReason.cancel
                              ) {
                                swalWithBootstrapButtons.fire({
                                  title: "Cancelled",
                                  text: "Your imaginary file is safe :)",
                                  icon: "error",
                                });
                              }
                            });
                        }}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
        </table>
      </div>
      <AddUserModal type={typeManage} userIdEdit={userIdEdit} />
    </div>
  );
}

export default ManageUser;
