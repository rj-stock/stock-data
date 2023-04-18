/** 爬取所有 K 线数据，但没有成交金额 */
export { default as crawlAllK } from "./crawl_all.ts"
/** 爬取最后 3600 条 K 线数据，有成交金额 */
export { default as crawlLast3600K } from "./crawl_last3600.ts"
/** 爬取最后 360 条 K 线数据，有成交金额 */
export { default as crawlLast360K } from "./crawl_last360.ts"
/** 爬取最后交易日的所有分时数据 */
export { default as crawlTodayAllTime } from "./crawl_time.ts"
/** 爬取最后交易日的最后那条 K 线的数据 */
export { default as crawlTodayLatestK } from "./crawl_today.ts"
