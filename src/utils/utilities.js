const REGEX_CONFIG = {
  password: /(?=.*\d)(?=.*[a-z])/,
  email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
};

export const isArrayEmpty = (arr = []) => !(Array.isArray(arr) && arr.length);

export const testRegx = (type, str) => REGEX_CONFIG[type].test(str);

export const AGE_OPTIONS = {
  options: [{
      value: '<20',
      id: 1
    },
    {
      value: '20-29',
      id: 2
    },
    {
      value: '30-39',
      id: 3
    },
    {
      value: '40-49',
      id: 4
    },
    {
      value: '50-59',
      id: 5
    },
    {
      value: '60-69',
      id: 6
    },
    {
      value: '70-79',
      id: 7
    },
    {
      value: '80+',
      id: 8
    },
  ],
};

export const RATINGS_OPTIONS = {
  options: [{
      value: '1',
      id: 1
    },
    {
      value: '2',
      id: 2,
    },
    {
      value: '3',
      id: 3,
    },
    {
      value: '4',
      id: 4,
    },
    {
      value: '5',
      id: 5,
    },
  ],
};