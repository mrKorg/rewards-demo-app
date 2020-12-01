export const getErrorMessage = (e) => {
  if (typeof e === "string") {
    return e;
  }
  return e?.response?.data?.message || null;
};

export const getErrorsText = (errors = {}) => {
  const errorsKeys = Object.keys(errors);
  if (errorsKeys.length) {
    let text = "";
    errorsKeys.forEach((key) => {
      if (Array.isArray(errors[key]) && errors[key].length) {
        text += errors[key].join(" ");
      } else if (typeof errors[key] === "string") {
        text += errors[key];
      }
    });
    return text;
  }
  return null;
};
