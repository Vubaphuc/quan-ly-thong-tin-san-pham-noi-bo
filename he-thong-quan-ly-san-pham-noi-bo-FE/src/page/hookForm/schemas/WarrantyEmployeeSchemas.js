import * as yup from "yup";

export const warrantyProductCreateChargeSchema = yup.object({
  productId: yup
    .number()
    .required("số lượng không được để trống")
    .integer("số lượng phải là số nguyên"),
  defectName: yup.string().required("Mô tả lỗi không được để trống"),
  price: yup
    .number()
    .required("Tiền không được để trống")
    .integer("Tiên phải không được là chuỗi ký tự"),
});

export const warrantyProductCreateNoChargeSchema = yup.object({
  productId: yup
    .number()
    .required("số lượng không được để trống")
    .integer("số lượng phải là số nguyên"),
  defectName: yup.string().required("Mô tả lỗi không được để trống"),
});

export const registerEngineerSchema = yup.object({
  employeeCode: yup.string().required("Nhân Viên sữa chữa không được để trống"),
});

export const warrantyCreateBillSchema = yup.object({
  productId: yup
    .number()
    .required("Mã sản phẩm không được để trống")
    .integer("Mã sản phẩm phải không được là chuỗi ký tự"),
});

export const updateInformationEngineerSchema = yup.object({
  employeeCode: yup.string().required("Nhân Viên sữa chữa không được để trống"),
});