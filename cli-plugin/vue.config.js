const path = require('path')

module.exports = {
  configureWebpack: {
    entry: path.join(__dirname, 'src/main.js')
  }
}
