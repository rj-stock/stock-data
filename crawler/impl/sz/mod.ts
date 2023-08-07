/** 爬取所有股票列表(仅包含标的代码和名称，因存在分页获取比较慢) */
export { default as crawlList } from "./crawl_list.ts"
/** 爬取标的的 K 线数据集(这个接口最多返回最近的 201 根 K 线) */
export { default as crawlK } from "./crawl_k.ts"
