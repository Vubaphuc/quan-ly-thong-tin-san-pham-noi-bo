import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordSchema } from "../../schemas/accountSchemas";
import { useForgotPasswordMutation } from "../../../../app/apis/employee/forgotPasswordApi";


const hookForgotPassword = () => {

    const navigate = useNavigate();

    const [sendEmail] = useForgotPasswordMutation();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(forgotPasswordSchema),
        mode: "all"
    });

    const onSendEmail = (data) => {

        console.log(data);

    }

    return {
        register, handleSubmit, errors, onSendEmail
    }

}

export default hookForgotPassword;