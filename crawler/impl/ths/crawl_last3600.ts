import { userAgent } from "../../../browser.ts"
import { formatDateTime, parseJsonp } from "../../../deps.ts"
import { Crawler } from "../../crawler.ts"
import { KData, KPeriod, StockData } from "../../../types.ts"
import { period2LineUrlPath, ts2IsoStandard } from "./internal.ts"

/** 响应体数据结构为 quotebridge_v6_line_33_000158_01_last3600(ResponsJson) */
type ResponsJson = {
  // 个股名称，如浦发银行 "\u6d66\u53d1\u94f6\u884c"
  name: string
  // 此周期首个数据的起始日期或时间：年月季周日周期的格式为 yyyyMMdd、分钟周期的格式为 yyyyMMddHHmm
  start: string
  // 此周期的总有K线个数
  total: string
  // 当前返回的实际K线个数
  num: number
  // 每个K线的数据用分号连接的字符串，格式为 "yyyyMMdd,开盘价,最高价,最低价,收盘价,成交量(股数),成交额(元),...;..."。
  // 如 60000 的 "...;20230414,7.28,7.31,7.25,7.27,25074604,182629850.00,0.085,,,0"
  data: string
}

/** 同花顺股票数据器爬取实现 */
const crawl: Crawler = async (code: string, period = KPeriod.Day, debug = false): Promise<StockData> => {
  const sp = period2LineUrlPath(period)
  const url = `http://d.10jqka.com.cn/v6/line/33_${code}/${sp}/last3600.js?ts=${Date.now()}`
  const response = await fetch(url, {
    headers: {
      "User-Agent": userAgent,
      "Host": "d.10jqka.com.cn",
      "Referer": "http://www.iwencai.com/",
    },
  })
  if (!response.ok) throw new Error(`从同花顺获取 "${code}" 数据失败：${response.status} ${response.statusText}`)

  /**
   * 响应体数据结构例子: quotebridge_v6_line_33_000158_00_last3600({
   *   "data":"yyyyMMdd,open,high,low,close,vol,amo,...;...",
   *   "name":"\u5e38\u5c71\u5317\u660e","start":"20000724","total":"5361",
   *   "marketType":"HS_stock_sz","issuePrice":"","today":"20230412",
   *   "rt":"0930-1130,1300-1500","num":3600,
   *   "year":{"2000":110,...,"2023":65},
   * })
   */
  const txt = await response.text()
  if (debug) Deno.writeTextFile(`temp/10jqka-v6-line-33_${code}-${sp}-last3600.js`, txt)

  const j = parseJsonp(txt) as ResponsJson
  // console.log(`${code} last 3600 ${period} k total=${j.total}`)
  const kk = j.data.split(";")
  const stockData: StockData = {
    ts: formatDateTime(new Date(), "yyyy-MM-ddTHH:mm:ss"),
    period,
    code,
    name: j.name,
    start: ts2IsoStandard(j.start),
    total: parseInt(j.total),
    dataCount: kk.length,
    data: kk.map((k) => {
      const ks = k.split(",")
      const kd: KData = {
        t: ts2IsoStandard(ks[0]),
        o: parseFloat(ks[1]),
        h: parseFloat(ks[2]),
        l: parseFloat(ks[3]),
        c: parseFloat(ks[4]),
        /** 成交量(股) */
        v: parseInt(ks[5]),
        /** 成交额(元) */
        a: parseFloat(ks[6]),
      }
      return kd
    }),
  }

  return stockData
}

export default crawl
