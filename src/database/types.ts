import { Log } from 'hurp-types';

export interface Config {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
}

export interface Options extends Config {
  tag?: string;
  log: Log;
}
