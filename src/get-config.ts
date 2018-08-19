import * as enw from 'enw';
import { Config } from './types';
import { readEnv as cache } from './cache';
import { readEnv as db } from './database';

export default function readEnv(prefix: string, env: NodeJS.ProcessEnv): Config {
  const read = enw.scope(prefix, {
    db: db(),
    cache: cache(),
    http: {
      listen: {
        host: enw.host('LISTEN_HOST', undefined, { require_tld: false }),
        port: enw.port('LISTEN_PORT'),
      },
    },
  });
  
  return read(env);
}
