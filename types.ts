/** 股票基础信息 */
export type Stock = {
  code: string
  name: string
  /** 上市日期 yyyy-MM-dd */
  startDate?: string
}

/** K 线数据 */
export type K = {
  open: number
  close: number
  low: number
  high: number
  /** 成交量(股) */
  vol: number
  /** 成交量(元) */
  amo: number
}

/** 周期 K */
export type PeriodK = K & {
  /**
   * 周期值。
   *
   * - 日 K 为 yyyy-MM-dd
   * - 月 K 为 yyyy-MM
   * - 年 K 为 yyyy
   */
  ts: string
}

/** K 线周期类型 */
export enum KType {
  Day,
  Month,
  Year,
}

/** 股票 K 线数据 */
export type StockK = Stock & {
  data: PeriodK[]
}
