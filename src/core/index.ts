import type { TMap } from "./types/global"

export function ats(arr: string[]) {
  return arr.reduce((acc, c) => {
    if (!c?.length) return acc
    return (acc.length ? acc + " " : "") + c
  }, "")
}

export function isBool(v: any): boolean {
  return typeof v == "boolean"
}

export function isStr(v: any): boolean {
  return typeof v == "string"
}

export function isNumber(v: any): boolean {
  return typeof v == "number"
}

export function isObj(value: any): boolean {
  return typeof value === "object" && value !== null
}

export function isArr(value: any): boolean {
  return Array.isArray(value)
}

export function isEqual(a: any, b: any): boolean {
  if (!isObj(a) || !isObj(b)) return a === b

  if (isArr(a) && isArr(b)) {
    if ((a as any[]).length != (b as any[]).length) return false
    return (a as any[]).every((v, i) => isEqual(v, (b as any[])[i]))
  }

  const AObjectEntries = Object.entries(a)
  const BObjectEntries = Object.entries(b)
  if (AObjectEntries.length != BObjectEntries.length) return false
  return AObjectEntries.every(([k, v], i) => {
    if (k != BObjectEntries[i][0]) return false
    return isEqual(v, (b as TMap<any>)[k])
  })
}
