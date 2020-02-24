/** 
 * webpack test configuration
*/
// externalizing dependencies to improve test boot up speed
const nodeExternals = require('webpack-node-externals')

module.exports = {
  devtool: 'inline-cheap-module-source-map',
  externals: [nodeExternals()]
};