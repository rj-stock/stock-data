import { StockK } from "../../types.ts"
import crawl from "./tsh_last3600.ts"

async function crawl2File(code: string): Promise<StockK> {
  const stockK = await crawl(code)
  console.log(`${code} k count=${stockK.data.length}`)
  Deno.writeTextFile(`temp/10jqka-v6-line-33_${code}-00-last3600.json`, JSON.stringify(stockK, null, 2))
  return stockK
}

// Deno.test("000158", async () => {
//   await crawl2File("000158")
// })

Deno.test("600000", async () => {
  await crawl2File("600000")
})
