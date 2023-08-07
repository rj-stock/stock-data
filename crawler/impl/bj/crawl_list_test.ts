import { assertStrictEquals, formatDateTime } from "../../../deps.ts"
import { StockBase } from "../../../types.ts"
import crawl from "./crawl_list.ts"

// 这个大概耗时几秒（2023-08-07）
Deno.test("all stock list", async () => {
  console.log("开始爬取，大概耗时 5 秒内...")
  const start = formatDateTime(new Date(), "yyyy-MM-dd HH:mm:ss")
  const list: StockBase[] = await crawl(true)
  console.log("start=" + start)
  console.log("end=" + formatDateTime(new Date(), "yyyy-MM-dd HH:mm:ss"))
  // 2023-08-07 total=210(4开头16+8开头194)
  console.log(
    `total=${list.length}` +
      `, 4开头=${list.filter(({ code }: StockBase) => code.startsWith("4")).length}` +
      `, 8开头=${list.filter(({ code }: StockBase) => code.startsWith("8")).length}`,
  )
  assertStrictEquals(list[0].code, "430017")
  assertStrictEquals(list[0].name, "星昊医药")

  list.forEach(({ code }) => assertStrictEquals(code.startsWith("4") || code.startsWith("8"), true))
})
