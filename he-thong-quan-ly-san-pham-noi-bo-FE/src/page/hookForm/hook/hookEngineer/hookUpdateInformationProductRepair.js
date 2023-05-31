import { useNavigate } from "react-router-dom";
import { useUpDateInformationProductbyIdMutation } from "../../../../app/apis/engineer/engineerApi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateInformationProductRepair } from "../../schemas/EngineerSchemas";
import { toast } from "react-toastify";


const hookUpdateInformationProductRepair = (productId) => {

    const id = productId;
    const navigate = useNavigate();

    const [updateInformationProduct] = useUpDateInformationProductbyIdMutation();

    const { control, register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(updateInformationProductRepair),
        mode: "all"
    });

    const onUpdateInformationProductRepair = (data) => {
        const newData = {...data, id: id}

        updateInformationProduct({id,...newData})
        .unwrap()
        .then((res) => {
            toast.success("Đăng Ký thành công");
            setTimeout(() => {
                navigate("/employee/engineer");
            },2000)           
            
        })
        .catch((err) => {
            toast.error(err.data.message);
        })
    }

    return {
        control, register, handleSubmit, errors, onUpdateInformationProductRepair
    }

}

export default hookUpdateInformationProductRepair;