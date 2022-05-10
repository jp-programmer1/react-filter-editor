const path = require('path');

module.exports = {
  resolve: {
    modules: [path.resolve(__dirname, "..", "src"), "node_modules"],
    alias: {
      "components": path.resolve(__dirname, "src/components")
    },
  }
};