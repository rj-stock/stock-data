import { KPeriod, StockData } from "../../../types.ts"
import crawl from "./crawl_last3600.ts"

async function crawl2File(code: string, period = KPeriod.Day, debug = false): Promise<StockData> {
  const stockData = await crawl(code, period, debug)
  Deno.writeTextFile(`temp/10jqka-v6-line-last3600-${code}-${period}.json`, JSON.stringify(stockData, null, 2))
  return stockData
}

Deno.test("600000 last 3600 year k", async () => {
  await crawl2File("600000", KPeriod.Year, false)
})

Deno.test("600000 last 3600 quarter k", async () => {
  await crawl2File("600000", KPeriod.Quarter, false)
})

Deno.test("600000 last 3600 month k", async () => {
  await crawl2File("600000", KPeriod.Month, false)
})

Deno.test("600000 last 3600 week k", async () => {
  await crawl2File("600000", KPeriod.Week, false)
})

Deno.test("600000 last 3600 day k", async () => {
  await crawl2File("600000", KPeriod.Day, false)
})

Deno.test("600000 last 3600 1 minute k", async () => {
  await crawl2File("600000", KPeriod.Minute1, false)
})

Deno.test("600000 last 3600 5 minutes k", async () => {
  await crawl2File("600000", KPeriod.Minute5, false)
})

Deno.test("600000 last 3600 30 minutes k", async () => {
  await crawl2File("600000", KPeriod.Minute30, false)
})

Deno.test("600000 last 3600 60 minutes k", async () => {
  await crawl2File("600000", KPeriod.Minute60, false)
})
