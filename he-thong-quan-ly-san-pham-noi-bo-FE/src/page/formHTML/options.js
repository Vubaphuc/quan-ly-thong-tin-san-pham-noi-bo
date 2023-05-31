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
  
  export const getEmployees = (employees) => {
    if (!employees) {
      return [];
    }
    return employees.map((employee) => {
      return {
        label: employee.employeeName,
        value: employee.employeeCode,
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
  
  export const getComponents = (components) => {
    if(!components) {
      return [];
    }
    return components.map((component) => {
      return {
        label: component.componentName,
        value: component.componentId,
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

  export const getStatus = () => {
    return [
        { label: "OK", value: true },
        { label: "PENDING", value: false },
    ];
  }