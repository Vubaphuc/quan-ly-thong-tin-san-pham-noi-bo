import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { orderMaterialCreateSchema } from "../../schemas/EngineerSchemas";
import { useUpdateOrderMaterialByIdMutation } from "../../../../app/apis/engineer/engineerApi";
import { toast } from "react-toastify";

const hookUpdateQuantityOrderMaterial = (orderId) => {

    const id = orderId;

    const navigate = useNavigate();

    const [updateOrderMaterial] = useUpdateOrderMaterialByIdMutation();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(orderMaterialCreateSchema),
        mode: "all"
    });

    const onUpdateQuantity = (data) => {
        const newData = {...data, id: id};
        updateOrderMaterial({id,...newData})
        .unwrap()
        .then((res) => {
            toast.success("Cập Nhật Thành Công");
            setTimeout(() => {
                navigate(`/employee/engineer/order/${res.data.id}`);
            },2000)           
        })
        .catch((err) => {
            toast.error(err.data.message);
        })
    }

    return {
        register, handleSubmit, errors, onUpdateQuantity
    }

}

export default hookUpdateQuantityOrderMaterial;