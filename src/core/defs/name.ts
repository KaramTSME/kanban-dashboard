import type { IName } from "../interfaces/i-name"

class Name implements IName {
  name!: string

  constructor({ name = "" }: Partial<IName>) {
    this.name = name
  }
}

export { Name }
