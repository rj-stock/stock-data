import { formatDateTime, parseArgs } from "../../../deps.ts"
import { KPeriod } from "../../../types.ts"
import crawl from "./crawl_today.ts"

async function crawl2File(code: string, period: KPeriod, debug = false): Promise<void> {
  const ts = formatDateTime(new Date(), "HH:mm:ss")
  const data = await crawl(code, period, debug)
  const j = JSON.stringify(data)
  console.log(`${ts} ${j}`)
  await Deno.writeTextFile(`temp/today-${code}-${period}.json`, `${ts} ${j}\r\n`, { append: true })
}

async function repeat(code: string, seconds: number, period: KPeriod): Promise<void> {
  try {
    return await new Promise((resolve) => {
      setInterval(async () => {
        await crawl2File(code, period, false)
        const c = new Date()
        if (c.getHours() >= 15 && c.getMinutes() >= 31) resolve(0)
      }, seconds * 1000)
    })
  } catch (error) {
    console.error(error.message)
  }
}

// log arguments help
console.info(
  `参数帮助：-c 指定代码 -p 指定周期(day、week、month、year、minute1、minute5、minute30、minute60) -t 指定间隔秒数
   如 deno run -A ./crawler/impl/ths/crawl_today_repeat.ts -c FG9999 -p minute1 -s 5`,
)

// parse cli arguments
const args = parseArgs(Deno.args)
const code = Object.hasOwn(args, "c") ? args["c"] : "600000"
const period = Object.hasOwn(args, "p") ? args["p"] as KPeriod : KPeriod.Day
const seconds = Object.hasOwn(args, "s") ? parseInt(args["s"]) : 1
await repeat(code, seconds, period)
