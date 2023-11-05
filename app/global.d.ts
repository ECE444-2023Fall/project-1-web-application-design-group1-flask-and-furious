import type { Database as DB } from '@/lib/database.types';

declare global {
  type Database = DB;
  type Prettify<T> = {
    [K in keyof T]: T[K];
    // eslint-disable-next-line @typescript-eslint/ban-types
  } & {};
}
