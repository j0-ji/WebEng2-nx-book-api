const { NxWebpackPlugin } = require('@nx/webpack');
const { join } = require('path');
console.log(join(__dirname, '.assets'))

module.exports = {
  output: {
    path: join(__dirname, '../dist/apps'),
  },
  plugins: [
    new NxWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: [`${__dirname}/src/assets`],
      optimization: false,
      outputHashing: 'none',
    }),
  ],
};
