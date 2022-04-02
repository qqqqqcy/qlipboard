const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  outputDir: './main-process/dist',
  configureWebpack: {
    entry: './renderer-process/src/main.js',
  },
});
