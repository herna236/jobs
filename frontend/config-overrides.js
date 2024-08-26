// config-overrides.js
const { override, addWebpackResolve, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackResolve({
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "buffer": require.resolve("buffer/"),
      "util": require.resolve("util/"),
      "stream": require.resolve("stream-browserify"),
      "vm": require.resolve("vm-browserify"),
      "process": require.resolve("process/browser")
    }
  }),
  addWebpackAlias({
    "process": require.resolve("process/browser")
  })
);
