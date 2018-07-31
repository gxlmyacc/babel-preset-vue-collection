import path from 'path';

export default function (context, options = {}) {
  // const env = process.env.BABEL_ENV || process.env.NODE_ENV
  const useBuiltIns = options.useBuiltIns;

  const presets = [
    [require('babel-preset-env').default, options],
    // vue jsx
    require.resolve('babel-preset-vue')
  ];

  const plugins = [
    // Polyfills the runtime needed for async/await and generators
    [require.resolve('babel-plugin-transform-runtime'), {
      helpers: !useBuiltIns,
      polyfill: !useBuiltIns,
      regenerator: true,
      // Resolve the Babel runtime relative to the config.
      moduleName: path.dirname(require.resolve('babel-runtime/package'))
    }],
    [require('babel-plugin-transform-object-rest-spread'), {
      useBuiltIns
    }],
    // For dynamic import that you will use a lot in code-split
    require.resolve('babel-plugin-syntax-dynamic-import')
  ];

  return {
    presets,
    plugins
  };
}
