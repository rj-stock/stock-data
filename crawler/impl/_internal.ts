// 仅在本目录内使用的内部函数

/**
 * 转换整数格式日期值为标准 ISO 格式。
 *
 * 1. yyyyMMddHHmmss > yyyy-MM-ddTHH:mm:ss
 * 2. yyyyMMddHHmm > yyyy-MM-ddTHH:mm
 * 2. yyyyMMddHH > yyyy-MM-ddTHH
 * 3. yyyyMMdd > yyyy-MM-dd
 * 4. yyyyMM > yyyy-MM
 * @param ts 整数日期值，如 202312011300
 * @returns ISO 格式的日期值
 */
export function tsNumber2IsoStandard(ts: string | number): string {
  const t = `${ts}`
  const len = t.length
  if (len >= 14) { // yyyyMMddHHmmss
    return `${t.substring(0, 4)}-${t.substring(4, 6)}-${t.substring(6, 8)}T${t.substring(8, 10)}:${
      t.substring(10, 12)
    }:${t.substring(12)}`
  } else if (len === 12) { // yyyyMMddHHmm
    return `${t.substring(0, 4)}-${t.substring(4, 6)}-${t.substring(6, 8)}T${t.substring(8, 10)}:${t.substring(10)}`
  } else if (len === 10) { // yyyyMMddHH
    return `${t.substring(0, 4)}-${t.substring(4, 6)}-${t.substring(6, 8)}T${t.substring(8)}`
  } else if (len === 8) { // yyyyMMdd
    return `${t.substring(0, 4)}-${t.substring(4, 6)}-${t.substring(6)}`
  } else if (len === 6) { // yyyyMM
    return `${t.substring(0, 4)}-${t.substring(4)}`
  } else return t
}
