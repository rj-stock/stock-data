// 股票数据器接口定义

import { KPeriod, StockKData, StockTimeData } from "../types.ts"

/** 爬取股票的 K 线数据集 */
export type KCrawler = (code: string, period?: KPeriod, debug?: boolean) => Promise<StockKData>

/** 爬取股票最后交易日的分时数据 */
export type TimeCrawler = (code: string, debug?: boolean) => Promise<StockTimeData>
