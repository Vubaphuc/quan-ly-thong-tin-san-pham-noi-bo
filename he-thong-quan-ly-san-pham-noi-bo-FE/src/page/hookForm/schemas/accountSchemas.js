import * as yup from "yup";

export const updatePersonalInformationSchema = yup.object ({
    fullName: yup.string().required("Họ và Tên không được để trống"),
    phone: yup.string().required("Số Điện Thoại không được để trống"),
    address: yup.string().required("Địa chỉ không được để trống")
});

export const changePasswordSchema = yup.object ({
    oldPassword: yup.string().required("Password cũ không được để trống"),
    newPassword1: yup.string()
        .required("Password mới không được để trống")
        .test('match', "Mật khẩu mới không được trùng mật khẩu cũ", function (value) {
            return value === this.parent.oldPassword ? false : true;
        }),
        newPassword2: yup.string()
        .required("Password mới không được để trống")
        .oneOf([yup.ref('newPassword1'), null], 'Mật khẩu mới không trùng khớp'),
});


export const forgotPasswordSchema = yup.object ({
    email: yup
    .string()
    .required("Email không được để trống")
    .matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "Email không hợp lệ"
    )
});