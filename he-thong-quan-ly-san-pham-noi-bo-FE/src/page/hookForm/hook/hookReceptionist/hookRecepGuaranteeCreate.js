import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { guaranteeCreateSchema } from "../../schemas/ReceptionistSchemas";
import { useCreateNewGuaranteeMutation } from "../../../../app/apis/receptionist/productApi";
import { toast } from "react-toastify";


const hookGuaranteecreate = () => {

    const navigate = useNavigate();

    const [createGuarantee] = useCreateNewGuaranteeMutation();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(guaranteeCreateSchema),
        mode: "all"
    });

    const onGuaranteeCreate = (data) => {
        createGuarantee(data)
        .unwrap()
        .then(() => {
            toast.success("Đăng ký Bảo Hành Thành Công");
            setTimeout(() => {
                navigate("/employee/receptionist/guarantees");
            },2000)                      
        })
        .catch((err) => {
            toast.error(err.data.message);
        })
    }

    return {
        register, handleSubmit, errors, onGuaranteeCreate
    }

}

export default hookGuaranteecreate;