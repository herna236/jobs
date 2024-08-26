const { override, addWebpackResolve } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackResolve({
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      util: require.resolve('util/'),
      buffer: require.resolve('buffer/'),
      vm: require.resolve('vm-browserify') // Added for `vm` module
    }
  })
);
