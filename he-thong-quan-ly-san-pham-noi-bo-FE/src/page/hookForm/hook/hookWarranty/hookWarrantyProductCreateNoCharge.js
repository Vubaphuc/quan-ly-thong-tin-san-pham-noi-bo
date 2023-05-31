import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { warrantyProductCreateNoChargeSchema } from "../../schemas/WarrantyEmployeeSchemas";
import { useCreateProductNoChargeMutation } from "../../../../app/apis/warrantyEmployee/warrantyEmployeeApi";
import { toast } from "react-toastify";

const hookWarrantyProductCreateNoCharge = () => {
    const navigate = useNavigate();

    const [createProductNoCharge] = useCreateProductNoChargeMutation();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(warrantyProductCreateNoChargeSchema),
        mode: "all"
    });

    const onProductCreateNoCharge = (data) => {
        createProductNoCharge(data)
        .unwrap()
        .then(() => {
            toast.success("Đăng Ký Thành Công");
            setTimeout(() => {
                navigate("/employee/warranty/products");
            },2000)                                
        })
        .catch((err) => {
            toast.error(err.data.message);
        })
    }

    return {
        register, handleSubmit, errors, reset, onProductCreateNoCharge
    }

}

export default hookWarrantyProductCreateNoCharge;