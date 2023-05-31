import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useWarrantyCreateBillMutation } from "../../../../app/apis/warrantyEmployee/warrantyEmployeeApi";
import { toast } from "react-toastify";
import { warrantyCreateBillSchema } from "../../schemas/WarrantyEmployeeSchemas";


const hookWarrantyBillCreate = () => {

    const navigate = useNavigate();

    const [createBill] = useWarrantyCreateBillMutation();

    const { control, register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(warrantyCreateBillSchema),
        mode: "all",
    });

    const onBillCreate = (data) => {
        createBill(data)
        .unwrap()
        .then(() => {
            toast.success("Tạo Hóa Đơn Thành Công");
            setTimeout(() => {
                navigate("/employee/warranty/bills")
            },2000)
        })
        .catch((err) => {
            toast.error(err.data.message);
        })
    }

    return {
        control, register, handleSubmit, errors, onBillCreate
    }

}

export default hookWarrantyBillCreate;