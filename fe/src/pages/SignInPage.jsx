import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";
import * as yup from "yup";
import { handleAuthenticationWithGoogle } from "../common/authenticationWithGoogle";
import { handleSignIn } from "../redux/request";
import {
  handleShowPassWord,
  setLoading,
} from "../redux/slices/signInSlice";
const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});
function SignInPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showPassword,  loading } = useSelector(
    (state) => state.signIn
  );
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });
  const handleSubmitFormSignIn = async (data) => {
    if (isSubmitting) return;
    if (isValid) {
      dispatch(setLoading(true));
      const response = await dispatch(handleSignIn(data));
      if (response.payload?.status === "success") {
        dispatch(setLoading(false));
        toast.success("Sign in successfully", {
          autoClose: 1000,
          pauseOnHover: false,
        });
        reset();
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
      dispatch(setLoading(false));
        toast.error("Email or password is incorrect", {
          autoClose: 1000,
          pauseOnHover: false,
        });
        return;
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-[400px] shadow-xl rounded bg-white ">
        <div>
          <NavLink
            to={"/sign-in"}
            className={({ isActive }) =>
              isActive
                ? "w-2/4 bg-white inline-block text-center p-2 border-b-2 border-b-[#fa8232] font-semibold"
                : "w-2/4 bg-white inline-block text-center p-2"
            }
          >
            Sign In
          </NavLink>
          <NavLink
            to={"/sign-up"}
            className="w-2/4 bg-white inline-block text-center p-2 border-b-2 border-b-slate-200"
          >
            Sign Up
          </NavLink>
        </div>
        <form
          autoComplete="off"
          onSubmit={handleSubmit(handleSubmitFormSignIn)}
          className="px-5 flex flex-col gap-y-3 mt-3 py-5"
        >
          <div className="flex flex-col gap-y-2">
            <label className="text-sm" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              {...register("email")}
              className="w-full outline-none border-slate-400 border p-2 rounded-sm"
            />
            {errors.email?.message && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="text-sm" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type={`${showPassword ? "text" : "password"}`}
                id="password"
                name="password"
                {...register("password")}
                className="w-full outline-none border-slate-400 border p-2 rounded-sm"
              />

              {!showPassword ? (
                <IoEyeOutline
                  onClick={() => dispatch(handleShowPassWord(!showPassword))}
                  className="absolute right-3 bottom-2/4 translate-y-2/4 cursor-pointer"
                />
              ) : (
                <IoEyeOffOutline
                  onClick={() => dispatch(handleShowPassWord(!showPassword))}
                  className="absolute right-3 bottom-2/4 translate-y-2/4 cursor-pointer"
                />
              )}
            </div>
            {errors.password?.message && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <button
            disabled={isSubmitting}
            className={`text-white font-semibold uppercase flex items-center justify-center p-2 min-h-10 bg-[#fa8232]`}
          >
            {loading ? (
              <div className="w-5 h-5 rounded-full border-2 animate-spin border-b-transparent pointer-events-none"></div>
            ) : (
              <div className="flex items-center gap-x-1">
                SIGN IN
                <FaArrowRight />
              </div>
            )}
          </button>
          <div className="relative flex my-4 justify-center items-center">
            <div className="flex-grow border-t border-slate-300"></div>
            <span className="absolute bg-white px-2 text-gray-500">or</span>
          </div>
          <button
            type="button"
            className="flex items-center justify-center p-2 border-slate-300 border gap-x-2"
            onClick={async () => {
              const userData = await handleAuthenticationWithGoogle(navigate);
              dispatch(
                handleSignIn({
                  name: userData?.displayName,
                  email: userData?.email,
                  role: "user",
                  userPicture: userData?.photoURL,
                  signInWithGoogle: true,
                  jwtByGoogle: userData?.accessToken || "",
                })
              );
            }}
          >
            Sign in with Google <FcGoogle className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignInPage;
