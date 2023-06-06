import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { updatePasswordSchema } from "../../schemas/adminSchemas";
import { useUpdatePasswordAccEmployeeByIdMutation } from "../../../../app/apis/admin/manage/employeeManageApi";
import { toast } from "react-toastify";

const hookAdminUpdatePassword = (employeeId) => {
    const id = employeeId;
    const navigate = useNavigate();

    const [updatePassword] = useUpdatePasswordAccEmployeeByIdMutation();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(updatePasswordSchema),
        mode: "all",
    });

    const onUpdatePassword = (data) => {
        const newData = {...data, id: id}
        updatePassword({id,...newData})
        .unwrap()
        .then((res) => {
            toast.success("Cập Nhật Thành Công");
            setTimeout(() => {
                navigate(`/admin/employees`)
            },1000)
        })
    }

    return {
        register, handleSubmit, errors, onUpdatePassword
    }

}

export default hookAdminUpdatePassword;