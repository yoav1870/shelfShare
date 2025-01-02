import translations from "./he.json";

//####################################################

export const getPageName = (path) => {
  const segments = path.split("/").filter(Boolean);
  const key = segments.length > 0 ? segments[segments.length - 1] : "home";
  return translations[key.toLowerCase()] || "";
};

//####################################################

export const t = (key) => {
  return translations[key.toLowerCase()] || "";
};

//####################################################

// Validate email - return true if email is valid
// ensures at least one lowercase letter , one uppercase letter, one digit, one special character and minimum 8 characters
export const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

//####################################################

// Validate email - return true if email is valid
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

//####################################################
