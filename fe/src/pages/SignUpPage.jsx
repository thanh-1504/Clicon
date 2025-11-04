import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { handleAuthenticationWithGoogle } from "../common/authenticationWithGoogle";
import { handleSignUp } from "../redux/request";
import {
  handleShowPassWord,
  handleShowPasswordConfirm,
  setIsSignUpWithGoogle,
  setLoading,
} from "../redux/slices/signUpSlice";
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
  passwordConfirm: yup
    .string()
    .required("Please enter your password confirm!")
    .oneOf(
      [yup.ref("password"), null],
      "Password confirmation must match the password"
    ),
  term: yup.boolean().oneOf([true], "Please accept the terms!"),
});

function SignUpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showPassword, showPasswordConfirm, isSignUpWithGoogle, loading } =
    useSelector((state) => state.signUp);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ resolver: yupResolver(schema) });

  const handleSubmitFormSignUp = async (data) => {
    if (isValid) {
      dispatch(setLoading(true));
      const response = await dispatch(handleSignUp(data));
      if (
        response.payload?.response?.data.message.startsWith(
          "E11000 duplicate key"
        )
      ) {
        dispatch(setLoading(false));
        toast.error("Email already exists", {
          pauseOnHover: false,
          autoClose: 1500,
        });
        return;
      } else {
        dispatch(setLoading(false));
        reset();
        toast.success("Registered successfully", {
          pauseOnHover: false,
          autoClose: 1500,
        });
        setTimeout(() => {
          navigate("/sign-in");
        }, 2000);
      }
    }
  };
  useEffect(() => {
    return () => {
      dispatch(setIsSignUpWithGoogle(false));
    };
  }, [dispatch]);
  return (
    <div className="flex justify-center py-10 h-screen items-center">
      <div className="w-full max-w-[400px] shadow-lg rounded bg-white">
        <div>
          <NavLink
            to={"/sign-in"}
            className="w-2/4 bg-white inline-block text-center p-2 border-b-2 border-b-slate-200"
          >
            Sign In
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "w-2/4 bg-white inline-block text-center p-2 border-b-2 border-b-[#fa8232] font-semibold"
                : "w-2/4 bg-white inline-block text-center p-2"
            }
          >
            Sign Up
          </NavLink>
        </div>
        <form
          autoComplete="off"
          onSubmit={handleSubmit(handleSubmitFormSignUp)}
          className="px-5 flex flex-col gap-y-3 mt-3 py-5"
        >
          <div className="flex flex-col gap-y-2">
            <label className="text-sm" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              {...register("name")}
              className="w-full outline-none border-slate-400 border p-2 rounded-sm"
            />
            {errors.name?.message && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
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
                className="w-full outline-none border-slate-400 border p-2 pr-8 rounded-sm"
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
          <div className="flex flex-col gap-y-2">
            <label className="text-sm" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={`${showPasswordConfirm ? "text" : "password"}`}
                id="confirmPassword"
                name="confirmPassword"
                {...register("passwordConfirm")}
                className="w-full outline-none border-slate-400 border p-2"
              />
              {!showPasswordConfirm ? (
                <IoEyeOutline
                  onClick={() =>
                    dispatch(handleShowPasswordConfirm(!showPasswordConfirm))
                  }
                  className="absolute right-3 bottom-2/4 translate-y-2/4 cursor-pointer"
                />
              ) : (
                <IoEyeOffOutline
                  onClick={() =>
                    dispatch(handleShowPasswordConfirm(!showPasswordConfirm))
                  }
                  className="absolute right-3 bottom-2/4 translate-y-2/4 cursor-pointer"
                />
              )}
            </div>
            {errors.passwordConfirm?.message && (
              <p className="text-red-500">{errors.passwordConfirm.message}</p>
            )}
          </div>
          <div className="my-2">
            <input
              type="checkbox"
              name="term"
              id="term"
              {...register("term")}
              className="mr-2"
            />
            <label className="select-none cursor-pointer" htmlFor="term">
              Are you agree to Clicon{" "}
              <span className="text-[#55b5f5] font-semibold">
                Terms of Condition
              </span>{" "}
              and{" "}
              <span className="text-[#55b5f5] font-semibold">
                Privacy Policy.
              </span>
              {errors.term?.message && (
                <p className="text-red-500">{errors.term.message}</p>
              )}
            </label>
          </div>
          <button
            disabled={isSubmitting}
            className={`text-white font-semibold uppercase flex items-center justify-center p-2 min-h-10 bg-[#fa8232]`}
          >
            {loading ? (
              <div className="w-5 h-5 rounded-full border-2 animate-spin border-b-transparent pointer-events-none"></div>
            ) : (
              <div className="flex items-center gap-x-1">
                SIGN UP
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
            disabled={isSignUpWithGoogle}
            className="flex items-center justify-center p-2 border-slate-300 border gap-x-2"
            onClick={async () => {
              dispatch(setIsSignUpWithGoogle(true));
              const userData = await handleAuthenticationWithGoogle(navigate);
              const { displayName, email, photoURL, accessToken } = userData;
              dispatch(
                handleSignUp({
                  name: displayName,
                  email,
                  userPicture: photoURL,
                  jwtByGoogle: accessToken,
                  signInWithGoogle: true,
                })
              );
            }}
          >
            Sign up with Google <FcGoogle className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
