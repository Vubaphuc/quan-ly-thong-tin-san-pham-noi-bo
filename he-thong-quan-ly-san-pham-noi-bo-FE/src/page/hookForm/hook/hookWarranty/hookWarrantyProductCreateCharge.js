import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { warrantyProductCreateChargeSchema } from "../../schemas/WarrantyEmployeeSchemas";
import { useCreateProductChargeMutation } from "../../../../app/apis/warrantyEmployee/warrantyEmployeeApi";
import { toast } from "react-toastify";

const hookWarrantyProductCreateCharge = () => {

    const navigate = useNavigate();

    const [createProductCharge] = useCreateProductChargeMutation();

    const { control, register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
        resolver: yupResolver(warrantyProductCreateChargeSchema),
        mode: "all",
    });

    const onProdcutCreateCharge = (data) => {
        createProductCharge(data)
        .unwrap()
        .then(() => {
            toast.success("Đăng Ký Thành Công");
            setTimeout(() => {
                navigate("/employee/warranty");
            },2000)                                
        })
        .catch((err) => {
            toast.error(err.data.message);
        })
    }

    return {
        control, handleSubmit, register, setValue, reset, errors, onProdcutCreateCharge
    }

}

export default hookWarrantyProductCreateCharge;