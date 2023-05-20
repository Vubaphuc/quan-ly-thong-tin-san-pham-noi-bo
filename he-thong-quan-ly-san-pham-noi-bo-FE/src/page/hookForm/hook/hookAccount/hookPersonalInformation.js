import { useNavigate } from "react-router-dom";
import { useUpdatePersonalInformationMutation } from "../../../../app/apis/employee/employeeApi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";


const hookPersonalInformation = () => {

    const navigate = useNavigate();

    const [personalInformation] = useUpdatePersonalInformationMutation();

    const { control, register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(),
        mode: "all"
    });

    const onPersonalInformation = (data) => {

        console.log(data);
    }

    return {
        control, register, handleSubmit, errors, onPersonalInformation
    }

}

export default hookPersonalInformation;