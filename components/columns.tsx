import { ElDivider } from "element-plus";
import "element-plus/es/components/divider/style/css";
import type {
  Align,
  TableColumns,
  LoadingConfig,
  PaginationProps
} from "@pureadmin/table";

import empty from "@/assets/svg/empty.svg?component";
import dayIcon from "@/assets/svg/day.svg?component";
import darkIcon from "@/assets/svg/dark.svg?component";
import chineseIcon from "@/assets/svg/chinese.svg?component";
import englishIcon from "@/assets/svg/english.svg?component";

let srcList: Array<string> = [];
const { BASE_URL } = import.meta.env;

for (let i = 1; i <= 11; i++) {
  srcList.push(`${BASE_URL}imgs/${i}.jpg`);
}

export function useColumns(tableRef: Ref) {
  const { t, locale } = useI18n();

  const columns: Array<TableColumns> = [
    {
      type: "selection",
      align: "left"
    },
    {
      // label: "Department Name",
      headerRenderer: () => t("table.department"), // label是纯字符串非响应式，所以有前端表头国际化需求时，请使用headerRenderer渲染器
      prop: "name",
      align: "left"
    },
    {
      label: "Sort",
      prop: "sort",
      children: [
        {
          label: "Remark",
          prop: "remark",
          children: [
            {
              label: "Creation Time",
              prop: "createTime"
            },
            {
              label: "Status",
              prop: "status",
              cellRenderer: ({ row, props }) => (
                <el-tag
                  size={props.size}
                  type={row.status === 1 ? "danger" : "success"}
                  effect="plain"
                >
                  {row.status === 0 ? "关闭" : "开启"}
                </el-tag>
              )
            }
          ]
        },
        {
          prop: "createTime",
          headerRenderer: () => <p>headerRenderer 😉</p>,
          cellRenderer: ({ index, props: { pagination } }) => {
            const { currentPage, pageSize } = pagination!;
            let currentIndex = (currentPage - 1) * pageSize + index;
            return (
              <el-image
                fit="cover"
                loading="lazy"
                preview-teleported={true}
                initial-index={currentIndex}
                src={srcList[currentIndex]}
                preview-src-list={srcList}
                style="width: 80px; height: 80px; border-radius: 6px"
              />
            );
          }
        }
      ]
    },
    {
      headerSlot: "operateHeader",
      fixed: "right",
      slot: "operation"
    }
  ];

  const { isDark, toggleDark } = useDark();
  const spacer = h(ElDivider, { direction: "vertical" });

  const tableHeight = ref(687);
  const tableSize = ref("default");
  const paginationSmall = ref(false);
  const paginationAlign = ref("right");

  let loading = ref(true);
  let language = ref(true);
  let dataList = ref<any>([]);

  /** 分页相关配置 */
  const pagination = reactive<PaginationProps>({
    pageSize: 5,
    currentPage: 1,
    small: false,
    background: true,
    align: "right",
    total: dataList.value.length
  });

  /** 加载动画相关配置 */
  const loadingConfig = reactive<LoadingConfig>({
    text: t("table.loading"),
    viewBox: "-10, -10, 50, 50",
    spinner: `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `
  });

  function onChange(val: any) {
    pagination.small = val;
  }

  function onRefresh() {
    loading.value = true;
    loadingConfig.text = t("table.loading");
    dataList.value = dataMock;
    pagination.total = dataMock.length;
    setTimeout(() => {
      loading.value = false;
    }, 800);
  }

  function onEmpty() {
    dataList.value = [];
    pagination.pageSize = 5;
    pagination.currentPage = 1;
    pagination.total = 0;
  }

  function getTableMethods() {
    console.log("methods", tableRef.value.getTableRef());
  }

  function handleUpdate(row: any) {
    console.log(row);
  }

  function handleDelete(row: any) {
    console.log(row);
  }

  function handleSelectionChange(val: any) {
    console.log("handleSelectionChange", val);
  }

  function rowClick(row: any, column: any, event: any) {
    console.log("rowClick", row, column, event);
  }

  function pageSizeChange(val: any) {
    console.log("pageSizeChange", val);
  }

  function pageCurrentChange(page: number) {
    loadingConfig.text = `${t("table.loadingPage")} ${page} ${t("table.page")}`;
    loading.value = true;
    delay(600).then(() => {
      loading.value = false;
    });
  }

  watch(paginationAlign, align => {
    pagination.align = align as Align;
  });

  watch(tableSize, (size: string) => {
    switch (size) {
      case "small":
        tableHeight.value = 622.5;
        break;
      case "default":
        tableHeight.value = 687;
        break;
      case "large":
        tableHeight.value = 751;
        break;
    }
  });

  // 初始化表格数据
  onRefresh();

  return {
    empty,
    dayIcon,
    darkIcon,
    chineseIcon,
    englishIcon,
    locale,
    spacer,
    loading,
    columns,
    dataList,
    language,
    tableSize,
    pagination,
    tableHeight,
    loadingConfig,
    paginationSmall,
    paginationAlign,
    t,
    rowClick,
    onEmpty,
    onChange,
    onRefresh,
    handleUpdate,
    handleDelete,
    pageSizeChange,
    getTableMethods,
    pageCurrentChange,
    handleSelectionChange,
    isDark,
    toggleDark
  };
}
