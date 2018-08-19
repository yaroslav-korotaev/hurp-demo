import { Log } from 'hurp-types';
import { App } from '../types';

export interface Context {
  app: App;
}

export interface Method {
  name: string;
  handler(ctx: Context, params: any): Promise<any>;
}

export interface Options {
  log: Log;
}
