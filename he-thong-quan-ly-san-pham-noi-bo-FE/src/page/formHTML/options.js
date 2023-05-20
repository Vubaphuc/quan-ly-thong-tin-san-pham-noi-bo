export const getAddress = (provinces) => {
    if (!provinces) {
      return [];
    }
    return provinces.map((province) => {
      return {
        label: province.name,
        value: province.name,
      };
    });
  };
  
  
  export const getRoles = (roles) => {
    if(!roles) {
      return [];
    }
    return roles.map((role) => {
      return {
        label: role.name,
        value: role.id,
      };
    });
  }
  
  export const getEmployees = (employee) => {
    if (!employee) {
      return [];
    }
    return nhanviens.map((employee) => {
      return {
        label: employee.fullName,
        value: employee.maNhanVien,
      };
    });
  }
  
  export const getTypeOptions = () => {
    return [
        { label: "OK", value: "OK" },
        { label: "PENDING", value: "PENDING" },
    ];
  }
  
  export const getVender = (venders) => {
    if(!venders) {
      return [];
    }
    return venders.map((vender) => {
      return {
        label: vender.name,
        value: vender.id,
      };
    });
  }
  
  export const getComponents = (component) => {
    if(!component) {
      return [];
    }
    return linhKiens.map((component) => {
      return {
        label: component.name,
        value: component.id,
      };
    });
  }
  
  export const getPhoneCompany = () => {
    return [
        { label: "Samsung", value: "Samsung" },
        { label: "Apple", value: "Apple" },
        { label: "Xiaomi", value: "Xiaomi" },
        { label: "Oppo", value: "Oppo" },
        { label: "Huawei", value: "Huawei" },
        { label: "Motorola", value: "Motorola" },
    ];
  }