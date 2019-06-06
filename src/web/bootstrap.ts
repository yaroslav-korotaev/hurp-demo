import Koa from 'koa';
import mount from 'koa-mount';
import { App } from '../types';
import { create, methods } from '../api';
import { RequestListener, Options } from './types';

export default function bootstrap(app: App, options: Options): RequestListener {
  const koa = new Koa();
  koa.context.bridge = app;
  
  const api = create(methods, {
    log: options.log,
  });
  
  koa.use(mount('/api', api));
  
  return koa.callback();
}
