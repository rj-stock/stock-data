# 股票、期货数据同步与读取

## 使用案例

### 1. 循环读取 1 分钟周期最后一根 K 线的数据

```shell
deno run -A https://deno.land/x/stock_data/crawler/impl/ths/crawl_today_repeat.ts -c ag2306 -p minute1

// output
ag2306 沪银2306
PreDayK={"t":"2023-04-19","o":5628,"h":5677,"l":5577,"c":5610,"v":792318,"a":66942496000,"p":5622}
23:59:11 minute1 {"t":"2023-04-19T23:59","o":5651,"h":5651,"l":5650,"c":5650,"v":185,"a":15685000,"zf":"0.71%"}
```

参数帮助：

- -c 指定代码，默认 600000
- -p 指定周期(day、week、month、year、minute1、minute5、minute30、minute60)，默认 day
- -t 指定间隔秒数，默认 1 秒
- -m 是否每次新数据输出到新行

## 数据表

| SN | 表名  | 说明 |
| -- | :---- | :--- |
| 1  | stock | 股票 |
| 2  | k_day | 日 K |

## 开发环境

deno + vscode
