import { KPeriod, StockData } from "../../../types.ts"
import crawl from "./crawl_all.ts"
import { period2LineUrlPath } from "./internal.ts"

async function crawl2File(code: string, period = KPeriod.Day, debug = false): Promise<StockData> {
  const sp = period2LineUrlPath(period)
  const stockK = await crawl(code, period, debug)
  // console.log(`${code} all ${period} k count=${stockK.data.length}`)
  Deno.writeTextFile(`temp/10jqka-v6-line-all-${code}-${period}.json`, JSON.stringify(stockK, null, 2))
  return stockK
}

Deno.test("600000 all year k", async () => {
  await crawl2File("600000", KPeriod.Year, false)
})

Deno.test("600000 all quarter k", async () => {
  await crawl2File("600000", KPeriod.Quarter, false)
})

Deno.test("600000 all month k", async () => {
  await crawl2File("600000", KPeriod.Month, false)
})

Deno.test("600000 all week k", async () => {
  await crawl2File("600000", KPeriod.Week, false)
})

Deno.test("600000 all day k", async () => {
  await crawl2File("600000", KPeriod.Day, false)
})

Deno.test("600000 all 1 minute k", async () => {
  await crawl2File("600000", KPeriod.Minute1, false)
})

Deno.test("600000 all 5 minutes k", async () => {
  await crawl2File("600000", KPeriod.Minute5, false)
})

Deno.test("600000 all 30 minutes k", async () => {
  await crawl2File("600000", KPeriod.Minute30, false)
})

Deno.test("600000 all 60 minutes k", async () => {
  await crawl2File("600000", KPeriod.Minute60, false)
})

// Deno.test("600000 all 15 minutes k", async () => {
//   await crawl2File("600000", KPeriod.Minute15, false)
// })
