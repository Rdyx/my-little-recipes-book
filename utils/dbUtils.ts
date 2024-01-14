import type { Table } from 'dexie'

export const getTableData = (tableName: keyof typeof db) => {
  // Cast type to prevent TS error
  return useObservable(from(liveQuery(() => (db[tableName] as Table).toArray())))
}
