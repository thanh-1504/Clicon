import axios from "axios";
const url = `https://api.cloudinary.com/v1_1/${
  import.meta.env.VITE_CLOUD_NAME
}/image/upload`;
export const handleUploadImageToCloud = async (file) => {
  if (!file) return null;
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "clicon");
  const request = await axios({
    url,
    method: "POST",
    data,
  });
  const response = await request.data;
  return response;
};
