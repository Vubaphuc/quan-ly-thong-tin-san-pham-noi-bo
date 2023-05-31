import { useFetcher, useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../../../../app/apis/receptionist/productApi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createProductSchema } from "../../schemas/ReceptionistSchemas";
import { toast } from "react-toastify";


const hookRecepProductCreate = () => {

    const navigate = useNavigate();

    const [createProduct] = useCreateProductMutation();

    const { control, register, handleSubmit, formState: { errors } }= useForm({
        resolver: yupResolver(createProductSchema),
        mode: "all"
    });

    const onCreateProduct = (data) => {

        console.log(data)

        createProduct(data)
        .unwrap()
        .then((res) => {
            toast.success("Đăng ký sản phẩm thành công");
            navigate("/employee/receptionist")
        })
        .catch((err) => {
            toast.error(err.data.message)
        })
    }

    return {
        control, register, handleSubmit, errors, onCreateProduct
    }

}

export default hookRecepProductCreate;