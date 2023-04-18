# Today Stock Changelog

## 0.2.0

- 实现从同花顺爬取期货数据，相关方法统一在 `crawler/impl/ths/mod.ts` 中导出了

  | Function Name       | Remark                                |
  | ------------------- | ------------------------------------- |
  | `crawlAllK`         | 爬取所有 K 线数据，但没有成交金额     |
  | `crawlLast3600K`    | 爬取最后 3600 条 K 线数据，有成交金额 |
  | `crawlLast360K`     | 爬取最后 360 条 K 线数据，有成交金额  |
  | `crawlTodayAllTime` | 爬取最后交易日的所有分时数据          |
  | `crawlTodayLatestK` | 爬取最后交易日的最后那条 K 线的数据   |

- 添加循环爬取最后交易日的最后那条 K 线的数据的 CLI
  - 参数帮助：`-c 指定代码 -p 指定周期(day、week、month、year、minute1、minute5、minute30、minute60) -t 指定间隔秒数`
  ```shell
  deno run -A ./crawler/impl/ths/crawl_today_repeat.ts -c FG9999 -p minute1 -s 5
  ```
  > 代表每隔5秒抓取一次玻璃主连的最后 1 分钟数据

## 0.1.0

- 实现从同花顺爬取股票数据
