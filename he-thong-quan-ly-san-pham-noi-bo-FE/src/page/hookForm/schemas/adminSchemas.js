import * as yup from "yup";

export const updateCustomerSchema = yup.object({
    id: yup.number().required("Id Khách hàng không được để trống"),
    fullName: yup.string().required("họ và tên không được để trống"),
    email: yup.string()
    .required("Email không được để trống")
    .matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "Email không hợp lệ"
    ),
    phone: yup.string()
    .required("Số Điện Thoại không được để trống")
    .matches(/(84|0[3|5|7|8|9])([0-9]{8})\b/, "Số Điện Thoại không hợp lệ"),
    address: yup.string().required("Đại chỉ không được để trống"),
    employeeCode: yup.string().required("Mã Nhân Viên không được để trống"),
  });

export const updateMaterialSchema = yup.object({
    id: yup.number().required("Id Vật Liệu không được để trống"),
    code: yup.string().required("Mã Vật liệu không được để trống"),
    nameModel: yup.string().required("Tên Model không được để trống"),
    employeeCode: yup.string().required("Mã Nhân Viên không được để trống"),
    componentId: yup.number().required("Id Linh kiện không được để trống"),
    vendorId: yup.number().required("Id Vendor không được để trống"),
});

export const updateOrderMaterialSchema = yup.object({
    id: yup.number().required("Id order không được để trống"),
    orderCode: yup.string().required("Mã order không được để trống"),
    orderQuantity: yup.number().required("Số lượng không được để trống"),
    status: yup.boolean().required("Trạng thái không được trống"),
    employeeOrderCode: yup.string().required("Mã Nhân Viên không được để trống"),
    componentId: yup.number().required("Id Linh kiện không được để trống"),
    materialId: yup.number().required("Id Linh kiện không được để trống"),
});

export const updateProductSchema = yup.object ({
    id: yup.number().required("Id sản phẩm không được để trống"),
    nameModel: yup.string().required("Tên Model không được để trống"),
    phoneCompany: yup.string().required("Hãng sản xuất không được để trống"),
    ime: yup.string().required("Số Ime Không được để trống"),
    defectName: yup.string().required("tên lỗi Không được để trống"),
    status: yup.boolean().required("Trạng thái Không được để trống"),
    price: yup.number().required("Giá Tiền không được để trống"),
    repair: yup.boolean().required("Loại sản phẩm Không được để trống"),
    charge: yup.boolean().required("Loại tính phí Không được để trống"),
    employeeRecepCode: yup.string().required("Mã Nhân Viên không được để trống"),
    
});

export const newCreateEmployeeSchema = yup.object ({
    fullName: yup.string().required("Họ và tên không được để trống"),
    email: yup
    .string()
    .required("Email không được để trống")
    .matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "Email không hợp lệ"
    ),
    phoneNumber: yup.string()
    .required("Số Điện Thoại không được để trống")
    .matches(/(84|0[3|5|7|8|9])([0-9]{8})\b/, "Số Điện Thoại không hợp lệ"),
    password: yup.string().required("Mật khẩu không được để trống"),
    address: yup.string().required("Địa chỉ không được để trống"),
    roleIds: yup.array().min(1, "Vui lòng chọn ít nhất một role"),

});

export const updateInformationSchema = yup.object({
    id: yup.number().required("Id sản phẩm không được để trống"),
    fullName: yup.string().required("Họ và tên không được để trống"),
    email: yup
    .string()
    .required("Email không được để trống")
    .matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "Email không hợp lệ"
    ),
    phone: yup.string()
    .required("Số Điện Thoại không được để trống")
    .matches(/(84|0[3|5|7|8|9])([0-9]{8})\b/, "Số Điện Thoại không hợp lệ"),
    address: yup.string().required("Địa chỉ không được để trống"),

});

export const updatePasswordSchema = yup.object({
    password: yup.string().required("Mật khẩu không được để trống"),
});