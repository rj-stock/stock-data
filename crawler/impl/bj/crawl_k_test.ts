import { assert, assertEquals, assertObjectMatch } from "../../../deps.ts"
import { KPeriod, StockKData } from "../../../types.ts"
import { CrawlInit } from "../../crawler.ts"
import crawl from "./crawl_k.ts"

async function crawl2File(code: string, period = KPeriod.Day, init?: CrawlInit): Promise<StockKData> {
  const stockK = await crawl(code, period, init)
  if (init?.debug) await Deno.writeTextFile(`temp/bj-${code}-${period}.json`, JSON.stringify(stockK, null, 2))
  return stockK
}

Deno.test("430510 day k all", async () => {
  const list = await crawl2File("430510", KPeriod.Day, { debug: true })
  assertEquals(list.code, "430510")
  assert(list.total >= 633, `expected >= 633 actual ${list.total}`)
  assertEquals(list.dataCount, list.total)
  assertEquals(list.name, "") // TODO
  assertObjectMatch(list.data[0], {
    "t": "20201228",
    "o": 6.48,
    "c": 6.39,
    "l": 6.37,
    "h": 6.6,
    "v": 1880765,
    "a": 12109054.15,
  })
})

Deno.test("430510 week k all", async () => {
  const list = await crawl2File("430510", KPeriod.Week, { debug: true })
  assertEquals(list.code, "430510")
  assert(list.total >= 134, `expected >= 134 actual ${list.total}`)
  assertEquals(list.dataCount, list.total)
  assertEquals(list.name, "") // TODO
  assertObjectMatch(list.data[0], {
    "t": "20201231",
    "o": 6.48,
    "c": 6.39,
    "l": 6.36,
    "h": 6.6,
    "v": 2815511,
    "a": 18082384.68,
  })
})

Deno.test("430510 month k all", async () => {
  const list = await crawl2File("430510", KPeriod.Month, { debug: true })
  assertEquals(list.code, "430510")
  assert(list.total >= 33, `expected >= 33 actual ${list.total}`)
  assertEquals(list.dataCount, list.total)
  assertEquals(list.name, "") // TODO
  assertObjectMatch(list.data[0], {
    "t": "202012",
    "o": 6.48,
    "c": 6.39,
    "l": 6.36,
    "h": 6.6,
    "v": 2815511,
    "a": 18082384.68,
  })
})

Deno.test("430510 year k all", async () => {
  const list = await crawl2File("430510", KPeriod.Year, { debug: true })
  assertEquals(list.code, "430510")
  assert(list.total >= 4, `expected >= 4 actual ${list.total}`)
  assertEquals(list.dataCount, list.total)
  assertEquals(list.name, "") // TODO
  assertObjectMatch(list.data[0], {
    "t": "2020",
    "o": 6.48,
    "c": 6.39,
    "l": 6.36,
    "h": 6.6,
    "v": 2815511,
    "a": 18082384.68,
  })
})
