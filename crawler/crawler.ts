// 股票数据器接口定义

import { KPeriod, StockData } from "../types.ts"

/** 爬取指定编码的股票数据 */
export type Crawler = (code: string, period?: KPeriod, debug?: boolean) => Promise<StockData>
