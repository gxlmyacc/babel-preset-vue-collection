module.exports = function (context, options) {
  let path = require('path');
  // const env = process.env.BABEL_ENV || process.env.NODE_ENV
  options = options || {};
  let useBuiltIns = options.useBuiltIns;
  let targets = options.targets;
  let polyfill = options.polyfill;
  delete options.polyfill;

  let presets = [
    [require('babel-preset-env').default, options],
    // vue jsx
    require.resolve('babel-preset-vue')
  ];

  let plugins = [
    polyfill ? [require.resolve('babel-plugin-polyfill-env'), options] : null,
    // Polyfills the runtime needed for async/await and generators
    [require.resolve('babel-plugin-transform-runtime'), {
      helpers: !useBuiltIns && !polyfill,
      polyfill: !useBuiltIns && !polyfill,
      regenerator: true,
      // Resolve the Babel runtime relative to the config.
      moduleName: path.dirname(require.resolve('babel-runtime/package'))
    }],
    [require('babel-plugin-transform-object-rest-spread'), {
      useBuiltIns: useBuiltIns
    }],
    // For dynamic import that you will use a lot in code-split
    require.resolve('babel-plugin-syntax-dynamic-import'),
    // class properties transforme
    require.resolve('babel-plugin-transform-class-properties'),
  ].filter(Boolean);

  return {
    presets: presets,
    plugins: plugins,
  };
};
