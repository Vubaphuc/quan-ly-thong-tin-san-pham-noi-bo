import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import { updateMaterialSchema } from "../../schemas/adminSchemas";
import { useUpdateMaterialByIdMutation } from "../../../../app/apis/admin/manage/materialManageApi";
import { toast } from "react-toastify";

const hookAdminUpdateMaterial = () => {

    const navigate = useNavigate();

    const [updateMaterial] = useUpdateMaterialByIdMutation();

    const { control, register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(updateMaterialSchema),
        mode: "all"
    });

    const onUpdateMaterial = (data) => {
        const id = data.id;
        updateMaterial({id,...data})
        .unwrap()
        .then(() => {
            toast.success("Cập Nhật Thành Công");
            setTimeout(() => {
                navigate("/admin/materials")
            }, 1000)
        })
        .catch((err) => {
            toast.error(err.data.messaage);
        })
    }

    return {
        control, register, handleSubmit, errors, onUpdateMaterial
    }
}

export default hookAdminUpdateMaterial;