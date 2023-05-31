import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePasswordSchema } from "../../schemas/accountSchemas";
import { useChangePasswordMutation } from "../../../../app/apis/employee/employeeApi";
import { toast } from "react-toastify";

const hookChangePassword = () => {

    const navigate = useNavigate();

    const [changePassword] = useChangePasswordMutation();


    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(changePasswordSchema),
        mode: "all",
    });

    const onChangePassword = (data) => {
        
        changePassword(data)
        .unwrap()
        .then(() => {
            toast.success("Đổi Mật khẩu thành công");
            setTimeout(() => {
                navigate("/employee/personal-information");
            },2000)                               
        })
        .catch((err) => {
            toast.error(err.data.message);
        })
    }

    return {
        register, handleSubmit, errors, onChangePassword
    }

}

export default hookChangePassword;