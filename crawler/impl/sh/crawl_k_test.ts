import { assert, assertEquals, assertObjectMatch } from "../../../deps.ts"
import { KPeriod, StockKData } from "../../../types.ts"
import { CrawlInit } from "../../crawler.ts"
import crawl from "./crawl_k.ts"

async function crawl2File(code: string, period = KPeriod.Day, init?: CrawlInit): Promise<StockKData> {
  const stockK = await crawl(code, period, init)
  if (init?.debug) await Deno.writeTextFile(`temp/sh-${code}-${period}.json`, JSON.stringify(stockK, null, 2))
  return stockK
}

Deno.test("600000 day k default latest 100", async () => {
  const list = await crawl2File("600000", KPeriod.Day, { debug: true })
  assertEquals(list.code, "600000")
  assert(list.total >= 5635)
  assertEquals(list.dataCount, 100)
})

Deno.test("600000 day k 230731~230805", async () => {
  const list = await crawl2File("600000", KPeriod.Day, { debug: false, start: 5630, end: 5635 })
  assertEquals(list.code, "600000")
  assert(list.total >= 5635)
  assertEquals(list.dataCount, 5)
  assertObjectMatch(list.data[0], {
    "t": "2023-07-31",
    "o": 7.55,
    "c": 7.6,
    "l": 7.52,
    "h": 7.64,
    "v": 52804227,
    "a": 400087143,
  })
  assertObjectMatch(list.data[list.data.length - 1], {
    "t": "2023-08-04",
    "o": 7.59,
    "c": 7.58,
    "l": 7.54,
    "h": 7.65,
    "v": 34256817,
    "a": 260297665,
  })
})

Deno.test("600000 day k first", async () => {
  const list = await crawl2File("600000", KPeriod.Day, { debug: false, start: 0, end: 1 })
  assertEquals(list.dataCount, 1)
  assertEquals(list.code, "600000")
  assertEquals(list.name, "") // TODO
  assert(list.total >= 5635)
  assertObjectMatch(list.data[0], {
    "t": "1999-11-10",
    "o": 29.5,
    "c": 27.75,
    "l": 27,
    "h": 29.8,
    "v": 174085055,
    "a": 4859102435,
  })
})

Deno.test("600000 day k all", async () => {
  const list = await crawl2File("600000", KPeriod.Day, { debug: false, start: 0 })
  assertEquals(list.code, "600000")
  assert(list.total >= 5635)
  assertEquals(list.dataCount, list.total)
  assertEquals(list.name, "") // TODO
  assertObjectMatch(list.data[0], {
    "t": "1999-11-10",
    "o": 29.5,
    "c": 27.75,
    "l": 27,
    "h": 29.8,
    "v": 174085055,
    "a": 4859102435,
  })
})

Deno.test("600000 week k all", async () => {
  const list = await crawl2File("600000", KPeriod.Week, { debug: true, start: 0 })
  assertEquals(list.code, "600000")
  assert(list.total >= 1191, `expected >= 5635 actual ${list.total}`)
  assertEquals(list.dataCount, list.total)
  assertEquals(list.name, "") // TODO
  assertObjectMatch(list.data[0], {
    "t": "1999-11-12",
    "o": 29.5,
    "c": 28.05,
    "l": 27,
    "h": 29.8,
    "v": 218496509,
    "a": 6102276257,
  })
})

Deno.test("600000 month k all", async () => {
  const list = await crawl2File("600000", KPeriod.Month, { debug: true, start: 0 })
  assertEquals(list.code, "600000")
  assert(list.total >= 285, `expected >= 285 actual ${list.total}`)
  assertEquals(list.dataCount, list.total)
  assertEquals(list.name, "") // TODO
  assertObjectMatch(list.data[0], {
    "t": "1999-11-30",
    "o": 29.5,
    "c": 26.4,
    "l": 26.01,
    "h": 29.8,
    "v": 304052752,
    "a": 8408724966,
  })
})

Deno.test("600000 year k all", async () => {
  const list = await crawl2File("600000", KPeriod.Year, { debug: true, start: 0 })
  assertEquals(list.code, "600000")
  assert(list.total >= 25, `expected >= 25 actual ${list.total}`)
  assertEquals(list.dataCount, list.total)
  assertEquals(list.name, "") // TODO
  assertObjectMatch(list.data[0], {
    "t": "1999-12-30",
    "o": 29.5,
    "c": 24.75,
    "l": 24.5,
    "h": 29.8,
    "v": 377680923,
    "a": 10297873521,
  })
})

Deno.test("600000 minute1 k default latest 100", async () => {
  const list = await crawl2File("600000", KPeriod.Minute1, { debug: true, start: 0 })
  assertEquals(list.code, "600000")
  assert(list.total >= 100)
  assertEquals(list.dataCount, 100)
})

Deno.test("600000 minute5 k", async () => {
  const list = await crawl2File("600000", KPeriod.Minute5, { debug: true, start: 0, end: 2 })
  assertEquals(list.code, "600000")
  assertEquals(list.dataCount, 2)
})

Deno.test("600000 minute15 k", async () => {
  const list = await crawl2File("600000", KPeriod.Minute15, { debug: true, start: 0, end: 2 })
  assertEquals(list.code, "600000")
  assertEquals(list.dataCount, 2)
})

Deno.test("600000 minute30 k", async () => {
  const list = await crawl2File("600000", KPeriod.Minute30, { debug: true, start: 0, end: 2 })
  assertEquals(list.code, "600000")
  assertEquals(list.dataCount, 2)
})

Deno.test("600000 minute60 k", async () => {
  const list = await crawl2File("600000", KPeriod.Minute60, { debug: true, start: 0, end: 2 })
  assertEquals(list.code, "600000")
  assertEquals(list.dataCount, 2)
})
