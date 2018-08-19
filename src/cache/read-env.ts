import * as enw from 'enw';
import { Config } from './types';

export default function readEnv(prefix: string = 'CACHE'): enw.ReadFn<Config> {
  return enw.scope(prefix, {
    ttl: enw.integer('TTL', 10000),
  });
}
