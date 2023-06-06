import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUpdateCustomerByIdMutation } from "../../../../app/apis/admin/manage/CustomerManageApi";
import { toast } from "react-toastify";
import { updateCustomerSchema } from "../../schemas/adminSchemas";


const hookAdminUpdateCustomer = () => {

    const navigate = useNavigate();

    const [updateCustomer] = useUpdateCustomerByIdMutation();

    const { control, register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(updateCustomerSchema),
        mode: "all"
    });

    const onUpdateCustomer = (data) => {
        const id = data.id;
        updateCustomer({id,...data})
        .unwrap()
        .then(() => {
            toast.success("Cập Nhật Thành Công");
            setTimeout(() => {
                navigate("/admin/customers")
            }, 1000)
        })
        .catch((err) => {
            toast.error(err.data.message);
        })

    }

    return {
        control, register, errors, handleSubmit, onUpdateCustomer
    }

}

export default hookAdminUpdateCustomer;