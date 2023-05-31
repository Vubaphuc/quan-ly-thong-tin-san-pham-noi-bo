import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerInformationEngineerSchema } from "../../schemas/ReceptionistSchemas";
import { useUpdateEngineerInformationByProductMutation } from "../../../../app/apis/receptionist/productApi";
import { toast } from "react-toastify";


const hookRecepRegisterInformationEngineer = (productId) => {
    const id = productId;

    const navigate = useNavigate();;

    const [registerEngineer] = useUpdateEngineerInformationByProductMutation();

    const { control, register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(registerInformationEngineerSchema),
        mode: "all"
    });

    const onRegisterEnginner = (data) => {

        const newData = {...data, productId: id};
        registerEngineer(newData)
        .unwrap()
        .then(() => {
            toast.success("Đăng ký nhân Viên thành công");
            navigate("/employee/receptionist")
        })
        .catch((err) => {
            toast.error(err.data.message);
        })
    }

    return {
        control, register, handleSubmit, errors, onRegisterEnginner
    }
}

export default hookRecepRegisterInformationEngineer;