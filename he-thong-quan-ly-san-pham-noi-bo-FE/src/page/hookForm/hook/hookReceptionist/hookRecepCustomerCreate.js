import { useNavigate } from "react-router-dom";
import { useCreateCustomerMutation } from "../../../../app/apis/receptionist/customerApi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createCustomerSchema } from "../../schemas/ReceptionistSchemas";
import { toast } from "react-toastify";

const hookRecepCustomerCreate = () => {

    const navigate = useNavigate();

    const [createCustomer] = useCreateCustomerMutation();

    const { control, register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(createCustomerSchema),
        mode: "all"
    });

    const onCreateCustomer = (data) => {
        createCustomer(data)
        .unwrap()
        .then((res) => {
            console.log(res)
            toast.success("Đăng Ký Thành Công");
            navigate(`/employee/receptionist/products/create/${res.data.id}`)
        })
        .catch((err) => {
            toast.error(err.data.message);
        })
    }

    return {
        control, register, handleSubmit, errors, onCreateCustomer
    }

}

export default hookRecepCustomerCreate;