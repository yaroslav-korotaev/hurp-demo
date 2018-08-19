import { Log } from 'hurp-types';
import { Options } from './types';
import { delay } from './utils';

export default class Database {
  public readonly tag: string;
  public readonly log: Log;
  
  private readonly data: Map<string, string>;
  
  constructor(options: Options) {
    this.tag = options.tag || 'database';
    this.log = options.log.child({ tag: this.tag });
    
    const data = new Map<string, string>();
    data.set('foo', 'blep');
    data.set('bar', 'blop');
    
    this.data = data;
  }
  
  public async init(): Promise<void> {
    this.log.info('connected');
  }
  
  public async destroy(): Promise<void> {
    this.log.info('disconnected');
  }
  
  public async load(key: string): Promise<string> {
    await delay(1000);
    
    const value = this.data.get(key);
    if (value === undefined)
      throw new Error('not found');
    
    return value;
  }
  
  public async save(key: string, value: string): Promise<void> {
    await delay(1000);
    
    this.data.set(key, value);
  }
}
