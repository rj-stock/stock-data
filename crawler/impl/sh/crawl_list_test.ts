import { assertStrictEquals } from "../../../deps.ts"
import { StockBase } from "../../../types.ts"
import crawl from "./crawl_list.ts"

Deno.test("all stock list", async () => {
  const list: StockBase[] = await crawl(true)
  // 2023-08-04 18:00:01 total=2228(主板1678+科创板550)
  console.log(
    `total=${list.length}` +
      `, 主板=${list.filter(({ code }: StockBase) => code.startsWith("60")).length}` +
      `, 科创板=${list.filter(({ code }: StockBase) => code.startsWith("68")).length}`,
  )
  assertStrictEquals(list[0].code, "600000")
  assertStrictEquals(list[0].name, "浦发银行")

  // 仅主板、科创板
  list.forEach(({ code }) => assertStrictEquals(code.startsWith("60") || code.startsWith("68"), true))
})
