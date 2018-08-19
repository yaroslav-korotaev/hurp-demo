import Koa from 'koa';
import compose from 'koa-compose';
import mount from 'koa-mount';
import { App } from '../types';
import { create, methods } from '../api';
import { RequestListener, Context, Options } from './types';

interface KoaOverridden extends Koa {
  context: Context;
  use(middleware: compose.Middleware<Context>): this;
}

export default function bootstrap(app: App, options: Options): RequestListener {
  const koa = new Koa() as KoaOverridden;
  koa.context.bridge = app;
  
  const api = create(methods, {
    log: options.log,
  });
  
  koa.use(mount('/api', api));
  
  return koa.callback();
}
