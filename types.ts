/** 股票基础信息 */
export type StockBase = {
  /** 代码 */
  code: string
  /** 名称 */
  name: string
}

/** K线周期类型 */
export enum KPeriod {
  /** 分时 */
  Time = "time",
  /** 日线 */
  Day = "day",
  /** 周线 */
  Week = "week",
  /** 周线 */
  Month = "month",
  /** 季线 */
  Quarter = "quarter",
  /** 年线 */
  Year = "year",
  /** 1分钟 */
  Minute1 = "minute1",
  /** 5分钟 */
  Minute5 = "minute5",
  /** 15分钟 */
  Minute15 = "minute15",
  /** 30分钟 */
  Minute30 = "minute30",
  /** 60分钟 */
  Minute60 = "minute60",
}

/** K 线数据 */
export type KData = {
  /** 开盘价 */
  o: number
  /** 收盘价 */
  c: number
  /** 最低价 */
  l: number
  /** 最高价 */
  h: number
  /** 成交量(股) */
  v: number
  /** 成交量(元) */
  a: number
  /**
   * 周期值。
   *
   * | 周期类型 | 值格式
   * |----------|----------
   * |    日    | yyyy-MM-dd
   * |    月    | yyyy-MM
   * |    年    | yyyy
   * |   分钟   | HH:mm
   */
  t: string
}

/** 股票 K 线数据。如 {period:"day", code:"60000",name:"浦发银行,data:[{...},...]} */
export type StockData = StockBase & {
  /** 数据时间戳 ISO DateTime yyyy-MM-ddTHH:mm:ss */
  ts: string
  /** 总周期数 */
  total: number
  /** K 线数据所属周期 */
  period: KPeriod
  /** 首个数据对应的日期或时间 */
  start?: string
  /** K 线数据集 */
  data: KData[]
  /** data 属性的元素数量 */
  dataCount: number
}
