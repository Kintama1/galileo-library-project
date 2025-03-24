// babel.config.js (create this in your project root)
module.exports = {
    presets: [
      ['@babel/preset-env', {targets: {node: 'current'}}],
      '@babel/preset-react'
    ],
  };