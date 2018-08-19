export interface Database {
  load(key: string): Promise<string>;
  save(key: string, value: string): Promise<void>;
}

export interface Cache {
  get(key: string): Promise<string | undefined>;
  set(key: string, value: string): Promise<void>;
}

export interface Options {
  db: Database;
  cache: Cache;
}
