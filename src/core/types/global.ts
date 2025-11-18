export type TNullable<T> = T | null
export type TOptional<T> = T | undefined

export type TMap<T = any> = { [key: string]: T }

export type TClass<T = any> = new (...args: any[]) => T

export type TFunction = (...args: any[]) => any
