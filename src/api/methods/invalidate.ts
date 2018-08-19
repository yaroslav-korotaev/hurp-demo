import { Context } from '../types';

export interface Params {}

export interface Result {}

export default {
  name: 'invalidate',
  async handler(ctx: Context, params: Params): Promise<Result> {
    const app = ctx.app;
    
    await app.cache.invalidate();
    
    return {};
  },
};
