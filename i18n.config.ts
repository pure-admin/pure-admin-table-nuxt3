// element-plus国际化
import enLocale from "element-plus/dist/locale/en.mjs";
import zhLocale from "element-plus/dist/locale/zh-cn.mjs";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "zh",
  fallbackLocale: "en",
  messages: {
    zh: {
      ...zhLocale
    },
    en: {
      ...enLocale
    }
  }
}));
