import type { Collection, Table } from 'dexie'

// Simple function to avoid the whole useObservable(...) stuff when querying db
export const queryTableData = <T>(table: Table<T> | Collection<T>) => {
  return useObservable(from(liveQuery(() => table.toArray())))
}
