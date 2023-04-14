// 股票数据器接口定义

import { KType, StockK } from "../types.ts"

/** 爬取指定编码的股票数据 */
export type Crawler = (code: string, type?: KType) => Promise<StockK>
