import { Context } from '../types';

export interface Params {
  key: string;
  value: string;
}

export interface Result {}

export default {
  name: 'set',
  async handler(ctx: Context, params: Params): Promise<Result> {
    const app = ctx.app;
    const key = params.key;
    const value = params.value;
    
    await app.storage.set(key, value);
    
    return {};
  },
};
