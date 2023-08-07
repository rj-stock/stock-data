// 仅在本目录内使用的内部函数
import { KPeriod } from "../../../types.ts"

/** 转换周期类型为获取K线数据url查询参数 period 的值 */
export const period2QueryParamValue = (period: KPeriod): string => {
  switch (period) {
    // 如 http://yunhq.sse.com.cn:32041/v1/sh1/dayk/600000?begin=-4&period=quarter
    // dayk 的 period 默认是日 K
    case KPeriod.Day:
      return "dayKline"
    case KPeriod.Week:
      return "weekKline"
    case KPeriod.Month:
      return "monthKline"
    case KPeriod.Year:
      return "yearKline"

    default:
      throw new Error(`Not supported period "${period}" for period2QueryParamValue`)
  }
}
