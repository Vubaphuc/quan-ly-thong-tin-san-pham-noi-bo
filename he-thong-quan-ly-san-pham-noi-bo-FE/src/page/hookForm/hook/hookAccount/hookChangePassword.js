import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePasswordSchema } from "../../schemas/accountSchemas";
import { useChangePasswordMutation } from "../../../../app/apis/employee/employeeApi";

const hookChangePassword = () => {

    const navigate = useNavigate();

    const { auth } = useSelector((state) => state.auth);

    const roles = auth.roles.map((role) => role.name);

    const [changePassword] = useChangePasswordMutation();


    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(changePasswordSchema),
        mode: "all",
    });

    const onChangePassword = (data) => {
        console.log(data);
    }

    return {
        register, handleSubmit, errors, onChangePassword
    }

}

export default hookChangePassword;