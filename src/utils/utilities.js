
const REGEX_CONFIG = {
  password: /(?=.*\d)(?=.*[a-z])/,
  email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
};
export const testRegx = (type, str) => {
  return REGEX_CONFIG[type].test(str);
};