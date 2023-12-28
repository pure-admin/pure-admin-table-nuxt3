// https://nuxt.com.cn/docs/api/nuxt-config
export default defineNuxtConfig({
  app: {
    buildAssetsDir: "/static/",
    baseURL: "/pure-admin-table-nuxt3/"
  },
  experimental: {
    payloadExtraction: false
  },
  devServer: {
    host: "0.0.0.0"
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@element-plus/nuxt",
    "nuxt-svgo-loader",
    "@nuxtjs/i18n"
  ],
  i18n: {
    lazy: true,
    langDir: "locales",
    defaultLocale: "zh",
    strategy: "no_prefix",
    locales: [
      { code: "zh", file: "zh-CN.yml", name: "简体中文" },
      { code: "en", file: "en.yml", name: "English" }
    ],
    // https://i18n.nuxtjs.org/guide/browser-language-detection
    detectBrowserLanguage: false,
    vueI18n: "./i18n.config.ts"
  },
  elementPlus: {
    importStyle: "css",
    themes: ["dark"]
  },
  css: ["@pureadmin/table/dist/style.css"],
  vite: {
    build: {
      chunkSizeWarningLimit: 4000
    }
  }
});
