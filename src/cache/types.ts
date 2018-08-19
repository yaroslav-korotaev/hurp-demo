import { Log } from 'hurp-types';

export interface Config {
  ttl: number;
}

export interface Options extends Config {
  tag?: string;
  log: Log;
}
