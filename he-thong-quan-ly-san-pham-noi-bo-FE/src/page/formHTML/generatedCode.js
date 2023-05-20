const generatedCode = () => {

    let usedCodes = [];

  const toGenerateCode = () => {
    let code;
    do {
      code = "";
      let year = new Date().getFullYear() % 100;
      code += year.toString().padStart(2, "0");
      let rd = Math.floor(Math.random() * 10000);
      code += rd.toString().padStart(4, "0");
      year = new Date().getFullYear() % 100;
      code += year.toString().padStart(2, "0");
    } while (existsByCode(code));

    // Tạo đối tượng usedCode
    let usedCode = {
      code: code,
    };

    // Lưu trữ mã đã sử dụng vào mảng usedCodes
    saveUsedCode(usedCode);

    return code;
  };

  const existsByCode = (code) => {
    return usedCodes.some((usedCode) => usedCode.code === code);
  }

  const saveUsedCode = (usedCode) => {
    usedCodes.push(usedCode);
  }


  return {
    toGenerateCode
  }

};

export default generatedCode;
