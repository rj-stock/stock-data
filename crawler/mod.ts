import { crawlList as crawlShList } from "./impl/sh/mod.ts"
import { crawlList as crawlBjList } from "./impl/sz/mod.ts"
import { crawlList as crawlSzList } from "./impl/bj/mod.ts"
import { StockBase } from "../types.ts"

/**
 * 爬取全市场所有股票列表(仅包含标的代码和名称)。
 * 包含沪市主板科创板、深市主板创业板、北市4和8开头。
 *
 * 先尝试从交易所获取，若有失败再尝试从小熊同学 api 获取。
 * 返回值键为标的代码、值为标的简称。
 */
export async function crawlAllStock(): Promise<Record<string, string>> {
  const map: Record<string, string> = {}
  let failedSh = false
  let failedSz = false
  let failedBj = false

  // 上交所
  let sub: StockBase[] = []
  try {
    sub = await crawlShList()
  } catch (_e) {
    failedSh = true
  }
  if (sub.length) for (const { code, name } of sub) map[code] = name

  // 北交所
  sub = []
  try {
    sub = await crawlBjList()
  } catch (_e) {
    failedBj = true
  }
  if (sub.length) for (const { code, name } of sub) map[code] = name

  // 深交所
  sub = []
  try {
    sub = await crawlSzList()
  } catch (_e) {
    failedSz = true
  }
  if (sub.length) for (const { code, name } of sub) map[code] = name

  // 候选小熊
  sub = []
  if (failedSh || failedSz || failedBj) {
    try {
      sub = await crawlSzList()
      // deno-lint-ignore no-empty
    } catch (_e) {}
  }
  if (sub.length) for (const { code, name } of sub) map[code] = name

  return map
}
