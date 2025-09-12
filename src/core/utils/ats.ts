const ats = (arr: string[]) =>
  arr.reduce((acc, c) => {
    if (!c?.length) return acc
    return acc + " " + c
  }, "")

export { ats }
