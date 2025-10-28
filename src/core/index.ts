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

export function isDate(obj: any): boolean {
  return obj instanceof Date
}

export function areDatesEqual(a?: Date, b?: Date): boolean {
  if (!a || !b || !isDate(a) || !isDate(b)) return false
  a.setMilliseconds(0)
  b.setMilliseconds(0)
  return a.toDateString() == b.toDateString() && a.getTime() == b.getTime()
}

export function areArraysEqual(a?: any[], b?: any[]): boolean {
  if (!a || !b || !isArr(a) || !isArr(b)) return false
  if ((a as any[]).length != (b as any[]).length) return false
  return (a as any[]).every((v, i) => isEqual(v, (b as any[])[i]))
}

export function areObjectsEqual(a?: TMap<any>, b?: TMap<any>): boolean {
  if (!a || !b || !isObj(a) || !isObj(b)) return false
  const AObjectEntries = Object.entries(a)
  const BObjectEntries = Object.entries(b)
  if (AObjectEntries.length != BObjectEntries.length) return false
  return AObjectEntries.every(([k, v], i) => {
    if (k != BObjectEntries[i][0]) return false
    return isEqual(v, (b as TMap<any>)[k])
  })
}

export function isEqual(a: any, b: any): boolean {
  if (!isObj(a) || !isObj(b)) return a === b
  if (isDate(a) && isDate(b)) return areDatesEqual(a, b)
  if (isArr(a) && isArr(b)) return areArraysEqual(a, b)
  return areObjectsEqual(a, b)
}
