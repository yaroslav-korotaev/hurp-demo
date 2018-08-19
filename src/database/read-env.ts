import * as enw from 'enw';
import { Config } from './types';

export default function readEnv(prefix: string = 'DB'): enw.ReadFn<Config> {
  return enw.scope(prefix, {
    host: enw.host('HOST', undefined, { require_tld: false }),
    port: enw.port('PORT'),
    database: enw.str('DATABASE'),
    user: enw.str('USER'),
    password: enw.str('PASSWORD'),
  });
}
