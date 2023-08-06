// 仅在本目录内使用的内部函数
import { KPeriod } from "../../../types.ts"

export function isMinutePeriod(period: KPeriod): boolean {
  return period.toString().startsWith("minute")
}

/** 转换代码为获取K线数据url的一个子路径 */
export function period2UrlPath(period: KPeriod): string {
  return isMinutePeriod(period) ? "minutek" : "dayk"
}

/** 转换周期类型为获取K线数据url查询参数 period 的值 */
export const period2QueryParamValue = (period: KPeriod): string => {
  switch (period) {
    // 如 http://yunhq.sse.com.cn:32041/v1/sh1/dayk/600000?begin=-4&period=quarter
    // dayk 的 period 默认是日 K
    case KPeriod.Day:
      return "day"
    case KPeriod.Week:
      return "week"
    case KPeriod.Month:
      return "month"
    case KPeriod.Year:
      return "year"
    case KPeriod.Quarter:
      return "quarter"

    // 实测上交所支持任意的分钟数值，如 http://yunhq.sse.com.cn:32041/v1/sh1/minutek/600000?begin=-4&period=3
    // minutek 的 period 默认是 5 分钟
    case KPeriod.Minute1:
      return "1"
    case KPeriod.Minute5:
      return "5"
    case KPeriod.Minute15:
      return "15"
    case KPeriod.Minute30:
      return "30"
    case KPeriod.Minute60:
      return "60"
    default:
      throw new Error(`Not supported period "${period}" for toPeriodParamValue`)
  }
}
