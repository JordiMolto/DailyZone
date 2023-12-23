const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        "@components": "@/components",
        "@views": "@/views",
        "@images": "@/assets/images",
        "@scss": "@/assets/styles",
        "@": "@/",
      },
    },
  },
});
