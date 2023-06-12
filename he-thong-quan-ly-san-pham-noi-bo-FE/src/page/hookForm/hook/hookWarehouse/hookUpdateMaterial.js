import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { updateMaterialSchema } from "../../schemas/WarehouseEmployeeSchemas";
import { useUpdateMaterialByIdMutation } from "../../../../app/apis/warehouseEmployee/warehouseEmployeeApi";
import { toast } from "react-toastify";

const hookUpdateMaterial = (materialId) => {

    const id = materialId;
    const navigate = useNavigate();

    const [updateMaterial] = useUpdateMaterialByIdMutation();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(updateMaterialSchema),
        mode: "all",
    });

    const onUpdateMaterial = (data) => {
        const newData = {...data, id: id}
        console.log(newData)
        updateMaterial({id,...newData})
        .unwrap()
        .then(() => {
            toast.success("Cập nhật thành công");
            setTimeout(() =>{
                navigate("/employee/warehouse")
            },1000 )
        })
        .catch((err) => {
            toast.error(err.data.message);
        })
    }

    return {
        register, handleSubmit, errors, onUpdateMaterial
    }
}

export default hookUpdateMaterial;