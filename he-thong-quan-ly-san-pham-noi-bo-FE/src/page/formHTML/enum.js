
export const getStatusLabel = (status) => {
    switch (status) {
        case "WAITING_FOR_REPAIR":
            return "Đang chờ sửa chữa";
        case "UNDER_REPAIR":
            return "Đang được sửa chữa";
        case "REPAIRED":
            return "Đã sửa chữa xong";
        case "WAITING_FOR_RETURN":
            return "Đang chờ trả khách";
        case "DELIVERED":
            return "Đã giao trả khách hàng";
        default:
            return "";
    }
};