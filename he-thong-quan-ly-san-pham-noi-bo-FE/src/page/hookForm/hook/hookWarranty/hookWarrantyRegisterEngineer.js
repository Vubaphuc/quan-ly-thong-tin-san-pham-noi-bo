import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerEngineerSchema } from "../../schemas/WarrantyEmployeeSchemas";
import { useUpdateEngineerInformationByProductMutation } from "../../../../app/apis/warrantyEmployee/warrantyEmployeeApi";
import { toast } from "react-toastify";

const hookWarrantyRegiterEngineer = (productId) => {

    const id = productId;

    const navigate = useNavigate();

    const [registerEngineer] = useUpdateEngineerInformationByProductMutation();

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(registerEngineerSchema),
        mode: "all",
    });

    const onRegisterEngineer = (data) => {
        const newData = {...data, productId: id};
        registerEngineer(newData)
        .unwrap()
        .then(() => {
            toast.success("Đăng Ký Thành Công");
            setTimeout(() => {
                navigate("/employee/warranty");
            },2000)                                   
        })
        .catch((err) => {
            toast.error(err.data.message);;
        })
    }

    return {
        control, handleSubmit, errors, onRegisterEngineer
    }

}

export default hookWarrantyRegiterEngineer;