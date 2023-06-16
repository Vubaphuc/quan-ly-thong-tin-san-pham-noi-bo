import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerInformationEngineerSchema } from "../../schemas/ReceptionistSchemas";
import { useUpdateEngineerProductByIdMutation } from "../../../../app/apis/receptionist/productApi";
import { toast } from "react-toastify";

const hookRecepUpdateProductPending = (productId) => {

    console.log(productId);
    const id = productId;

    const navigate = useNavigate();

    const [updateEngineer] = useUpdateEngineerProductByIdMutation();

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(registerInformationEngineerSchema),
        mode: "all"
    });

    const onUpdateProductPending = (data) => {

        const newData = {...data, id: id}

        console.log(newData)

        updateEngineer({id,...newData})
        .unwrap()
        .then(() => {
            toast.success("Cập Nhật Thành Công");
            setTimeout(() => {
                navigate("/employee/receptionist/products/pending");
            },2000)                            
        })
        .catch((err) => {
            toast.error(err.data.message);
        })

    }

    return {
        control, handleSubmit, errors, onUpdateProductPending
    }
}

export default hookRecepUpdateProductPending;