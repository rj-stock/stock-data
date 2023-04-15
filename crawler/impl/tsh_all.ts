/**
 * 这个 url 爬取的数据缺点是没有成交金额。
 *
 * 1. 打开页面 http://stockpage.10jqka.com.cn/300025/ ，然后点“日K”并切换到“不复权”，发出下面的数据请求：
 * 2. https://d.10jqka.com.cn/v6/line/hs_300025/${dd}/all.js|today.js
 *
 * 其中:
 * | dd | type | Remark
 * |----|------|--------
 * | 20 | 月 K | 不复权
 * | 10 | 周 K | 不复权
 * | 00 | 日 K | 不复权
 * | 21 | 月 K | 前复权
 * | 11 | 周 K | 前复权
 * | 01 | 日 K | 前复权
 * | 22 | 月 K | 后复权
 * | 12 | 周 K | 后复权
 * | 02 | 日 K | 后复权
 */
import { parseJsonp } from "../../deps.ts"
import { Crawler } from "../crawler.ts"
import { KType, PeriodK, StockK } from "../../types.ts"
import { userAgent } from "../../browser.ts"
const debug = true

type ResponsJson = {
  // 个股名称，如浦发银行 "\u6d66\u53d1\u94f6\u884c"
  name: string
  // 上市日期 yyyyMMdd
  start: string
  // 上市以来的总K线个数
  total: string
  // 格式为 [[年份的 yyyy 数字,年份的K线个数],...]，年份值由小到大
  // 如 60000 的 [[1999,  36], [2000, 237],..., [2022, 242], [2023, 68]]
  sortYear: [[number, number]]
  // 格式为交易日的 MMdd 格式用逗号连接的字符串，年份需要从 sortYear 中取
  // 按逗号分割后其长度值应与 total 的值相等
  dates: string
  // 成交量(股数)的逗号字符串连接，如 "15007900,...,19475694"
  // 按逗号分割后其长度值应与 total 的值相等
  volumn: string
  // price 字段内价格的值对应的乘数，为 100，如实际价格为 7.25 在 price 中显示为 725
  priceFactor: number
  // 各个K线数据的字符串连接，如 "2700,250,280,75,2753,5,85,18,...,720,2,9,5,725,3,6,2"
  // "最低价x100,(开盘价-最低价)x100,(最高价-最低价)x100,(收盘价-最低价)x100,..."
  // 每根K线占用4个位置，按逗号分割后其长度值应与 totalx4 的值相等
  price: string
}

/**
 * 同花顺股票数据器爬取实现。
 *
 * 1. 打开页面 http://stockpage.10jqka.com.cn/300025/ 然后点“日K”并切换到不复权，发出下面的数据请求
 * 2. https://d.10jqka.com.cn/v6/line/hs_300025/00/all.js
 */
const crawl: Crawler = async (code: string, _type = KType.Day): Promise<StockK> => {
  const url = `http://d.10jqka.com.cn/v6/line/hs_${code}/00/all.js?ts=${Date.now()}`
  const response = await fetch(url, {
    headers: {
      "User-Agent": userAgent,
      "Host": "d.10jqka.com.cn",
      "Referer": "http://www.iwencai.com/",
    },
  })
  if (!response.ok) throw new Error(`从同花顺获取 "${code}" 数据失败：${response.status} ${response.statusText}`)

  /**
   * 响应体数据结构例子: quotebridge_v6_line_hs_600000_01_all({
   *   "total":"5559","start":"19991110",
   *   "name":"\u6d66\u53d1\u94f6\u884c",
   *   "sortYear":[[1999,36],...,[2023,68]],
   *   "priceFactor":100,
   *   "price":"...,720,2,9,5,725,3,6,2",
   *   "volumn":"...,25074604",
   *   "afterVolumn":"...",
   *   "dates":"1110,...,0414",
   *   "issuePrice":"","marketType":"HS_stock_sh",
   * })
   */
  const txt = await response.text()
  if (debug) Deno.writeTextFile(`temp/10jqka-v6-line-hs_${code}-00-all.js`, txt)

  const j = parseJsonp(txt) as ResponsJson
  const dates = j.dates.split(",")
  const volumns = j.volumn.split(",")
  const prices = j.price.split(",")
  const yearKCounts = j.sortYear
  const total = parseInt(j.total)
  const priceFactor = j.priceFactor
  console.log(`${code} k total=${j.total}`)
  // console.log("dates.length=" + dates.length)
  // console.log("volumns.length=" + volumns.length)
  // console.log("prices.length=" + prices.length)
  // console.log("priceFactor=" + priceFactor)
  if (dates.length !== total || volumns.length !== total || prices.length !== total * 4) {
    throw new Error("检测到同花顺返回错误的数据结构")
  }

  // 解析K线数据
  const periodKs: PeriodK[] = []
  let yc = 0
  for (const [year, count] of yearKCounts) {
    for (let j = 0; j < count; j++) {
      const i = yc + j
      const MMdd = dates[i]
      const k = i * 4
      const [low10, dOpen, dHigh, dClose] = [
        parseInt(prices[k]),
        parseInt(prices[k + 1]),
        parseInt(prices[k + 2]),
        parseInt(prices[k + 3]),
      ]

      periodKs.push({
        ts: year + "-" + MMdd.substring(0, 2) + "-" + MMdd.substring(2),
        low: low10 / priceFactor,
        open: (low10 + dOpen) / priceFactor,
        high: (low10 + dHigh) / priceFactor,
        close: (low10 + dClose) / priceFactor,
        /** 成交量(股) */
        vol: parseInt(volumns[i]),
        /** NO 成交额(元) */
        amo: 0,
      })
    }
    yc += count
  }

  //
  const stockK: StockK = {
    code,
    name: j.name,
    // 上市日
    startDate: j.start.substring(0, 4) + "-" + j.start.substring(4, 6) + "-" + j.start.substring(6),
    data: periodKs,
  }

  return stockK
}

export default crawl
