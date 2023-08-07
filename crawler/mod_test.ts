import { formatDateTime } from "../deps.ts"
import { crawlAllStock } from "./mod.ts"

Deno.test("crawlList", async () => {
  // 2023-08-07
  // 沪市2229：主板1678、科创板551
  // 深市2805：主板1505、创业板1300
  // 北市210：4开头16、8开头194
  const start = formatDateTime(new Date(), "yyyy-MM-dd HH:mm:ss")
  console.log("start=" + start)
  console.log("开始爬取全市场所有股票清单，请内心等待...")
  const map: Record<string, string> = await crawlAllStock()
  console.log("end=" + formatDateTime(new Date(), "yyyy-MM-dd HH:mm:ss"))

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

  console.log(`total=${total}`)
  console.log(`沪市 ${sh60 + sh68}：主板 ${sh60}、科创板 ${sh68}`)
  console.log(`深市 ${sz0 + sz3}：主板 ${sz0}、创业板 ${sz3}`)
  console.log(`北市 ${bj4 + bj8}：4开头 ${bj4}、8开头 ${bj8}`)
  console.log(`其它 ${other}`)
})
