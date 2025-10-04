const ats = (arr: string[]) =>
  arr.reduce((acc, c) => {
    if (!c?.length) return acc
    return (acc.length ? acc + " " : "") + c
  }, "")

export { ats }
