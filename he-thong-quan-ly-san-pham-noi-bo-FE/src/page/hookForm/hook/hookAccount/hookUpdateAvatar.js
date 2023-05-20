import { useState } from "react";
import hookFetchQuery from "./hookFetchQuery";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const hookUpdateAvatar = () => {
  const [files, setFiles] = useState(null);
  const navigate = useNavigate();

  const { token } = hookFetchQuery();

  const handleChangeAvatar = async () => {
    const formData = new FormData();

    formData.append("avatar", files);

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const rs = await axios.post(
        "http://localhost:8080/api/v1/employee/upload-avatar",
        formData,
        {
          headers,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
        // chưa chuyển  trang
      navigate("/");

    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return {
    setFiles,
    handleChangeAvatar,
  };
};

export default hookUpdateAvatar;
