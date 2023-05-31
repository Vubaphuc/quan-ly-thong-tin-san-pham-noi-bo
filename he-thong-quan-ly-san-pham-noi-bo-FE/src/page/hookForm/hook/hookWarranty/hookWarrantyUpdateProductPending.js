import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { updateInformationEngineerSchema } from "../../schemas/WarrantyEmployeeSchemas";
import { useUpdateEngineerProductByIdMutation } from "../../../../app/apis/warrantyEmployee/warrantyEmployeeApi";
import { toast } from "react-toastify";


const hookWarrantyUpdataProductPending = (productId) => {

    const id = productId;
    const navigate = useNavigate();

    const [updateEngineer] = useUpdateEngineerProductByIdMutation();

    const { control, register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(updateInformationEngineerSchema),
        mode: "all",
    });

    const onWarrantyUpdateProduct = (data) => {
        const newData = {...data, id: id}
        updateEngineer({id,...newData})
        .unwrap()
        .then(() => {
            toast.success("Thay Đổi Thành Công");
            setTimeout(() => {
                navigate("/employee/warranty/product/pending")
            },2000)
        })
        .catch((err) => {
            toast.error(err.data.message);
        })
    }

    return {
        control, register, handleSubmit, errors, onWarrantyUpdateProduct
    }

}

export default hookWarrantyUpdataProductPending;