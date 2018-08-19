import * as http from 'http';
import Koa from 'koa';
import { Log } from 'hurp-types';
import { App } from '../types';

export type RequestListener = (req: http.IncomingMessage, res: http.ServerResponse) => void;

export interface Context extends Koa.Context {
  bridge: App;
}

export interface Options {
  log: Log;
}
