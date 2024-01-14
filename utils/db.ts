import Dexie, { type Table } from 'dexie'

export type Ingredients = {
  name: string
}

class MlrbDB extends Dexie {
  ingredients!: Table<Ingredients>

  constructor() {
    super('db')
    this.version(1).stores({
      ingredients: 'name'
    })
  }
}

export const db = new MlrbDB()
