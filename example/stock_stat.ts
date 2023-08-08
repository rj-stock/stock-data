/**
 * 股票市场标的统计。
 *
 * 从交易所网站获取所有股票列表，然后在终端输出按市场分类的数量统计信息。
 *
 * 2023-08-07:
 *   沪市2229：主板1678、科创板551
 *   深市2805：主板1505、创业板1300
 *    北市210：4开头16、8开头194
 */
import { crawlAllStock } from "../crawler/mod.ts"
import { formatDateTime } from "../deps.ts"

function ts(pattern = "yyyy-MM-ddTHH:mm:ss"): string {
  return formatDateTime(new Date(), pattern)
}
function log(msg: string): void {
  console.log(`${ts()} ${msg}`)
}

log("查询沪深京股票清单中...")
const map: Record<string, string> = await crawlAllStock()
log("查询完成，统计如下：")

let sh60 = 0, sh68 = 0, sz0 = 0, sz3 = 0, bj4 = 0, bj8 = 0, other = 0, total = 0
for (const [code, _] of Object.entries(map)) {
  total++
  if (code.startsWith("0")) sz0++
  else if (code.startsWith("3")) sz3++
  else if (code.startsWith("60")) sh60++
  else if (code.startsWith("68")) sh68++
  else if (code.startsWith("4")) bj4++
  else if (code.startsWith("8")) bj8++
  else other++
}
console.warn([
  `  总数量：${total}`,
  `  上交所: 共 ${sh60 + sh68}、主板 ${sh60}、科创板 ${sh68}`,
  `  深交所: 共 ${sz0 + sz3}、主板 ${sz0}、创业板 ${sz3}`,
  `  北交所: 共 ${bj4 + bj8}、4开头 ${bj4}、8开头 ${bj8}`,
  `  其它 ${other}`,
].join("\n"))
