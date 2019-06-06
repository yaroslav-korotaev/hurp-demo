import * as http from 'http';
import { Log } from 'hurp-types';

export type RequestListener = (req: http.IncomingMessage, res: http.ServerResponse) => void;

export interface Options {
  log: Log;
}
