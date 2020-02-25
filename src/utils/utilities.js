const REGEX_CONFIG = {
  password: /(?=.*\d)(?=.*[a-z])/,
  email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
};

export const isArrayEmpty = (arr = []) => !(Array.isArray(arr) && arr.length);

export const testRegx = (type, str) => REGEX_CONFIG[type].test(str);

//default format to YYYY/DD/MM
export const getCurrentDate = () => {
  const currentDate = new Date(Date.now());
  const {
    getFullYear,
    getDay,
    getMonth
  } = currentDate;
  return `${getFullYear()} \ ${getDay()} \ ${getMonth()}`;
};