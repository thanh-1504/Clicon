import { useState } from "react";
import { AiOutlineCamera } from "react-icons/ai"; // Biểu tượng camera
import { useDispatch, useSelector } from "react-redux";

function AccountSettingOnMobile() {
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

  // State để lưu trữ ảnh người dùng
  const [userImage, setUserImage] = useState(
    userInformation?.userPicture || "./images/macbookPro.png"
  );
  const [isHovered, setIsHovered] = useState(false); // State để kiểm tra hover

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  console.log(isHovered);
  return (
    <div className="pt-36 flex justify-center">
      <form>
        <div
          className="w-40 h-40 border rounded-full relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={userImage}
            alt="user"
            className="w-full h-full object-contain"
          />
          {isHovered && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center rounded-full">
              <label
                htmlFor="image-upload"
                className="cursor-pointer text-white"
              >
                <AiOutlineCamera className="w-6 h-6" />
              </label>
            </div>
          )}
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
      </form>
    </div>
  );
}

export default AccountSettingOnMobile;
