import { StockTimeData } from "../../../types.ts"
import crawl from "./crawl_time.ts"

async function crawl2File(code: string, debug = false): Promise<StockTimeData> {
  const stockData = await crawl(code, debug)
  await Deno.writeTextFile(`temp/10jqka-v6-time-last-${code}.json`, JSON.stringify(stockData, null, 2))
  return stockData
}

Deno.test("600000 last time data", async () => {
  await crawl2File("600000", true)
})

Deno.test("300001 last time data", async () => {
  await crawl2File("300001", true)
})
