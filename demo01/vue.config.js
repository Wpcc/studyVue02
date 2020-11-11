const path = require('path')
module.exports = {
  lintOnSave: false,
  configureWebpack: {
    entry: path.join(__dirname, 'src/main.js')
  }
}
