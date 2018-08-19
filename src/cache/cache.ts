import { Log } from 'hurp-types';
import { Options } from './types';
import { delay } from './utils';

interface Record {
  expire: number;
  value: string;
}

export default class Cache {
  public readonly tag: string;
  public readonly log: Log;
  
  private readonly data: Map<string, Record>;
  private readonly ttl: number;
  private interval: NodeJS.Timer | null;
  
  constructor(options: Options) {
    this.tag = options.tag || 'cache';
    this.log = options.log.child({ tag: this.tag });
    
    this.data = new Map();
    this.ttl = options.ttl || 10000;
    this.interval = null;
  }
  
  public async init(): Promise<void> {
    this.interval = setInterval(() => this.cleanup(), this.ttl * 2);
    
    this.log.info('ready');
  }
  
  public async destroy(): Promise<void> {
    if (this.interval)
      clearInterval(this.interval);
    
    this.log.info('destroyed');
  }
  
  public async get(key: string): Promise<string | undefined> {
    await delay(50);
    
    const now = Date.now();
    const record = this.data.get(key);
    
    if (record && record.expire > now)
      return record.value;
    
    return undefined;
  }
  
  public async set(key: string, value: any): Promise<void> {
    await delay(50);
    
    const now = Date.now();
    const record = {
      expire: now + this.ttl,
      value,
    };
    
    this.data.set(key, record);
  }
  
  public async invalidate(): Promise<void> {
    this.data.clear();
    
    this.log.info('invalidated');
  }
  
  private cleanup(): void {
    const now = Date.now();
    const keys = Array.from(this.data.keys());
    
    let deleted = 0;
    
    for (const key of keys) {
      const record = this.data.get(key) as Record;
      if (record.expire <= now) {
        this.data.delete(key);
        deleted++;
      }
    }
    
    if (deleted)
      this.log.info({ deleted }, 'cleanup');
  }
}
