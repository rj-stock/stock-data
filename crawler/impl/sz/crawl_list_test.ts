import { assertStrictEquals, formatDateTime } from "../../../deps.ts"
import { StockBase } from "../../../types.ts"
import crawl from "./crawl_list.ts"

// 这个大概耗时 20 秒（2023-08-07）
Deno.test("all stock list", async () => {
  console.log("开始爬取，大概耗时 20 秒，耐心等候...")
  const start = formatDateTime(new Date(), "yyyy-MM-dd HH:mm:ss")
  const list: StockBase[] = await crawl(true)
  console.log("start=" + start)
  console.log("end=" + formatDateTime(new Date(), "yyyy-MM-dd HH:mm:ss"))
  // 2023-08-04 18:00:01 total=2228(主板1678+科创板550)
  console.log(
    `total=${list.length}` +
      `, 主板=${list.filter(({ code }: StockBase) => code.startsWith("0")).length}` +
      `, 创业板=${list.filter(({ code }: StockBase) => code.startsWith("3")).length}`,
  )
  assertStrictEquals(list[0].code, "000001")
  assertStrictEquals(list[0].name, "平安银行")

  // 仅主板、创业板
  list.forEach(({ code }) => assertStrictEquals(code.startsWith("0") || code.startsWith("3"), true))
})
