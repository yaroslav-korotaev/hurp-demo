import Hurp from 'hurp';
import { Log } from 'hurp-types';
import { Cache } from './cache';
import { Database } from './database';
import { Storage } from './storage';
import HttpServer from 'hurp-http-server';
import * as web from './web';
import { Options } from './types';

export default class App extends Hurp {
  public readonly tag: string;
  public readonly log: Log;
  public readonly db: Database;
  public readonly cache: Cache;
  public readonly storage: Storage;
  public readonly server: HttpServer;
  
  constructor(options: Options) {
    super();
    
    const log = options.log;
    
    this.tag = options.tag || 'app';
    this.log = options.log.child({ tag: this.tag });
    
    const db = new Database({
      log,
      ...options.db,
    });
    this.db = this.use(db);
    
    const cache = new Cache({
      log,
      ...options.cache,
    });
    this.cache = this.use(cache);
    
    const storage = new Storage({
      db,
      cache,
    });
    this.storage = storage;
    
    const server = new HttpServer({
      log,
      handler: web.bootstrap(this, { log }),
      ...options.http,
    });
    this.server = this.use(server);
  }
}
