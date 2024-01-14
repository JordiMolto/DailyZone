const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        "@components": "@/components",
        "@views": "@/views",
        "@images": "@/assets/images",
        "@scss": "@/assets/styles",
        "@": path.resolve(__dirname, "src"),
      },
    },
  },
});
