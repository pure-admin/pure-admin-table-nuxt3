import type { I18n } from "vue-i18n";
import type { TableColumns } from "@pureadmin/table";

// 在 declare global 中声明后项目中所有组件实例都能访问到全局属性对象的类型
declare global {
  /**
   *  继承 `@pureadmin/table` 的 `TableColumns` ，方便全局直接调用
   */
  interface TableColumnList extends Array<TableColumns> {}
}

declare module "vue" {
  interface NuxtApp {
    $i18n: I18n;
  }
}
