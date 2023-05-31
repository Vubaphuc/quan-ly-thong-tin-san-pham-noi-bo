import { useNavigate } from "react-router-dom";
import { useCreateMaterialMutation } from "../../../../app/apis/warehouseEmployee/warehouseEmployeeApi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { materialCreateSchema } from "../../schemas/WarehouseEmployeeSchemas";


const hookMaterialCreate = () => {

    const navigate = useNavigate();

    const [materialCreate] = useCreateMaterialMutation();

    const { control, register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(materialCreateSchema),
        mode: "all"
    });

    const onMaterialCreate = (data) => {
        materialCreate(data)
        .unwrap()
        .then(() => {
            toast.success("Đăng Ký Thành Công");
            setTimeout(() => {
                navigate("/employee/warehouse");
            },2000)                                 
        })
        .catch((err) => {
            toast.error(err.data.message);
        })
    }

    return {
        control, register, handleSubmit, errors, onMaterialCreate
    }

}

export default hookMaterialCreate;