import { signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, googleProvider } from "../firebaseConfig";
export const handleAuthenticationWithGoogle = async (navigate) => {
  googleProvider.setCustomParameters({ prompt: "select_account" });
  try {
    const userInfo = await signInWithPopup(auth, googleProvider);
    setTimeout(() => {
      toast("Logged in successfully", {
        pauseOnHover: false,
        autoClose: 1000,
        type: "success",
      });
    }, 1000);
    setTimeout(() => {
      navigate("/");
    }, 3000);
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: userInfo?.user.uid,
        email: userInfo?.user.email,
        displayName: userInfo?.user.displayName,
        userPicture: userInfo?.user.photoURL,
        role: "user",
      })
    );
    return userInfo?.user;
  } catch (error) {
    console.log(error.message);
  }
};
