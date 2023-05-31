import { useNavigate } from "react-router-dom";
import { useCreateBillMutation } from "../../../../app/apis/receptionist/productApi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createBillSchema } from "../../schemas/ReceptionistSchemas";
import { toast } from "react-toastify";



const hookRecepBillCreate = () => {

    const navigate = useNavigate();

    const [createBill] = useCreateBillMutation();

    const { register, handleSubmit, formState: { errors } } = useForm ({
        resolver: yupResolver(createBillSchema),
        mode: "all"
    });

    const onCreateBill = (data) => {
        
        createBill(data)
        .unwrap()
        .then((rs) => {
            toast.success("Tạo Hóa đơn Thành Công");
            setTimeout(() => {
                navigate(`/employee/receptionist/guarantee/create/${rs.data.id}`);
            },2000)                      
            
        })
        .catch((err) => {
            toast.error(err.data.message);
        })
    }

    return {
        register, handleSubmit, errors, onCreateBill
    }

}

export default hookRecepBillCreate;