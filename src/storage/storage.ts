import {
  Database,
  Cache,
  Options,
} from './types';

export default class Storage {
  private readonly db: Database;
  private readonly cache: Cache;
  
  constructor(options: Options) {
    this.db = options.db;
    this.cache = options.cache;
  }
  
  public async get(key: string): Promise<string> {
    let value = await this.cache.get(key);
    
    if (!value) {
      value = await this.db.load(key);
      
      await this.cache.set(key, value);
    }
    
    return value;
  }
  
  public async set(key: string, value: string): Promise<void> {
    await this.db.save(key, value);
    
    await this.cache.set(key, value);
  }
}
