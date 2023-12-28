import PureTable from "@pureadmin/table";

export default defineNuxtPlugin(() => {
  const { use, $nuxt } = useNuxtApp().vueApp;
  // 全局注册@pureadmin/table
  use(PureTable, { i18n: $nuxt.$i18n });
});
