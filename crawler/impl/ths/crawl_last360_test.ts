import { KPeriod, StockKData } from "../../../types.ts"
import crawl from "./crawl_last360.ts"

async function crawl2File(code: string, period = KPeriod.Day, debug = false): Promise<StockKData> {
  const stockData = await crawl(code, period, debug)
  await Deno.writeTextFile(`temp/10jqka-v6-line-last360-${code}-${period}.json`, JSON.stringify(stockData, null, 2))
  return stockData
}

Deno.test("600000 last 360 k of year", async () => {
  await crawl2File("600000", KPeriod.Year, false)
})

Deno.test("600000 last 360 k of quarter", async () => {
  await crawl2File("600000", KPeriod.Quarter, false)
})

Deno.test("600000 last 360 k of month", async () => {
  await crawl2File("600000", KPeriod.Month, false)
})

Deno.test("600000 last 360 k of week", async () => {
  await crawl2File("600000", KPeriod.Week, false)
})

Deno.test("600000 last 360 k of day", async () => {
  await crawl2File("600000", KPeriod.Day, false)
})

Deno.test("600000 last 360 k of 1 minute", async () => {
  await crawl2File("600000", KPeriod.Minute1, false)
})

Deno.test("600000 last 360 k of 5 minutes", async () => {
  await crawl2File("600000", KPeriod.Minute5, false)
})

Deno.test("600000 last 360 k of 30 minutes", async () => {
  await crawl2File("600000", KPeriod.Minute30, false)
})

Deno.test("600000 last 360 k of 60 minutes", async () => {
  await crawl2File("600000", KPeriod.Minute60, false)
})
