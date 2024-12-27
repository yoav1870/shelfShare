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
