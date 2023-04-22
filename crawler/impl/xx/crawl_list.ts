/**
 * 通过小熊同学 api 接口 https://api.doctorxiong.club/v1/stock/all 获取全部股票。
 *
 * 官方文档：https://www.doctorxiong.club/api/#api-Stock-getAllStock
 *
 * @module
 */
import { ListCrawler } from "../../crawler.ts"
import { StockBase } from "../../../types.ts"

type ResponsJson = {
  // 响应码，如 200 代表成功、400 解析请求失败、500 内部网络异常
  code: number
  // 响应消息，如 "操作成功"
  message: string
  // 跟踪ID，如 "qANwWt-RQnFxww"
  traceId: string
  // 标的列表数据
  // 如 [["sh600000", "浦发银行"], ...]
  data: [[string, string]]
}

/** 获取全部股票列表 */
const crawl: ListCrawler = async (debug = false): Promise<StockBase[]> => {
  const url = `https://api.doctorxiong.club/v1/stock/all?ts=${Date.now()}`
  const response = await fetch(url)
  if (!response.ok) throw new Error(`从小熊同学获取全部股票清单失败：${response.status} ${response.statusText}`)

  const j = await response.json() as ResponsJson
  if (debug) Deno.writeTextFile(`temp/doctorxiong-list.json`, JSON.stringify(j, null, 2))
  if (j.code !== 200) throw new Error(j.message)

  // 解析数据: 代码前缀带有市场类别符号 sh 和 sz，需去除
  return j.data.map(([code, name]) => ({ code: code.substring(2), name } as StockBase))
}

export default crawl
