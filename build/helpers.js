'use strict';
const { join } = require('path');
module.exports = {
  DEV_PORT: 8000,
  resolvePathDir: dirName => {
    return join(__dirname, '..', dirName);
  },
};
