import { useState } from "react";
import hookFetchQuery from "./hookFetchQuery";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const hookUpdateAvatar = () => {
  const [files, setFiles] = useState(null)

  const { token } = hookFetchQuery();

  const navigate = useNavigate();


  const handleChangeAvatar = async () => {

    const formData = new FormData();

    formData.append("avatar", files);

    try {

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const rs = await axios.post(
        "http://localhost:8080/nhan-vien/upload-avatar",
        formData,
        {
          headers
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      

      navigate("/nhan-vien/thong-tin/tai-khoan")

    } catch (error) {

      console.log(error);
      
    }
  };





  return {
      setFiles, handleChangeAvatar
  }
};

export default hookUpdateAvatar;
