import { Log } from 'hurp-types';
import { Database, Config as DatabaseConfig } from './database';
import { Cache, Config as CacheConfig } from './cache';
import { Storage } from './storage';
import HttpServer from 'hurp-http-server';

export interface Config {
  db: DatabaseConfig;
  cache: CacheConfig;
  http: {
    listen: {
      host: string;
      port: number;
    };
  };
}

export interface Options extends Config {
  tag?: string;
  log: Log;
}

export interface App {
  db: Database;
  cache: Cache;
  storage: Storage;
  server: HttpServer;
}
