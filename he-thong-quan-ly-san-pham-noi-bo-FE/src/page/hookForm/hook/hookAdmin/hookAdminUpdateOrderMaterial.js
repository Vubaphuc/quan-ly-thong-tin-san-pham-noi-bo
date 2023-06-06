import { useNavigate } from "react-router-dom";
import { useUpdateOrderMaterialByIdMutation } from "../../../../app/apis/admin/manage/materialManageApi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateOrderMaterialSchema } from "../../schemas/adminSchemas";
import { toast } from "react-toastify";

const hookAdminUpdateOrderMaterial = () => {
    const navigate = useNavigate();

    const [updateOrderMaterial] = useUpdateOrderMaterialByIdMutation();

    const { control, register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(updateOrderMaterialSchema),
        mode: "all"
    });

    const onUpdateOrderMaterial = (data) => {
        const id = data.id;
        updateOrderMaterial({id,...data})
        .unwrap()
        .then(() => {
            toast.success("Cập Nhật Thành Công");
            setTimeout(() => {
                navigate("/admin/orderMaterials");
            })
        })
        .catch((err) => {
            toast.error(err.data.message);
        })
    }

    return {
        control, handleSubmit, onUpdateOrderMaterial, register, errors
    }

}

export default hookAdminUpdateOrderMaterial;