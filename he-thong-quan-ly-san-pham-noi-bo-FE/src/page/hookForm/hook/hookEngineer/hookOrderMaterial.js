import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { orderMaterialCreateSchema } from "../../schemas/EngineerSchemas";
import { useCreateOrderMaterialMutation } from "../../../../app/apis/engineer/engineerApi";
import { toast } from "react-toastify";

const hookOrderMaterial = () => {

    const navigate = useNavigate();

    const [orderCreate] = useCreateOrderMaterialMutation();

    const { register, handleSubmit,formState: { errors } } = useForm({
        resolver: yupResolver(orderMaterialCreateSchema),
        mode: "all"
    });

    const onOrderMaterial = (data) => {
        orderCreate(data)
        .unwrap()
        .then(() => {
            toast.success("Tạo Order Material thành công");
            setTimeout(() => {
                navigate("/employee/engineer/orders");
            },2000)                      
        })
        .catch((err) => {
            toast.error(err.data.message);
        })
    }

    return {
        register, handleSubmit, errors, onOrderMaterial
    }
}

export default hookOrderMaterial;