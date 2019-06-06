import Koa from 'koa';
import compose from 'koa-compose';
import route from 'koa-route';
import { Context as ApiContext, Method, Options } from './types';

export default function create(
  methods: Method[],
  options: Options,
): compose.Middleware<Koa.Context> {
  const map = new Map<string, Method>();
  for (const method of methods)
    map.set(method.name, method);
  
  const log = options.log.child({ tag: 'api' });
  
  return route.get('/:name', async (koaCtx: Koa.Context, name: string): Promise<void> => {
    const method = map.get(name);
    if (!method)
      return koaCtx.throw(404);
    
    const apiCtx: ApiContext = {
      // tslint:disable-next-line:no-unsafe-any
      app: koaCtx.bridge,
    };
    // tslint:disable-next-line:no-unbound-method
    const handler = method.handler;
    
    try {
      const result = await handler(apiCtx, koaCtx.query);
      
      koaCtx.body = result;
    } catch (err) {
      // tslint:disable:no-unsafe-any
      
      log.error({ err }, err.message);
      
      koaCtx.status = 500;
      koaCtx.body = {
        error: {
          message: err.message,
        },
      };
      
      // tslint:enable:no-unsafe-any
    }
  });
}
