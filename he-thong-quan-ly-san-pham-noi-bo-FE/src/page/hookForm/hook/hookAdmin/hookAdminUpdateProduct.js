import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { updateProductSchema } from "../../schemas/adminSchemas";
import { useUpdateProductByIdMutation } from "../../../../app/apis/admin/manage/productManageApi";
import { toast } from "react-toastify";

const hookAdminUpdateProduct = () => {
    const navigate = useNavigate();

    const [updateProduct] = useUpdateProductByIdMutation();

    const { control, register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(updateProductSchema),
        mode: "all"
    });

    const onUpdateProduct = (data) => {
        console.log(data)
        const id = data.id;
        updateProduct({id,...data})
        .unwrap()
        .then(() => {
            toast.success("Cập Nhật Thành Công");
            setTimeout(() => {
                navigate("/admin/products");
            })
        })
        .catch((err) => {
            toast.error(err.data.message);
        })
    }

    return {
        control, register, handleSubmit, errors, onUpdateProduct
    }

}

export default hookAdminUpdateProduct;