import { Context } from '../types';

export interface Params {
  key: string;
}

export interface Result {
  value: any;
}

export default {
  name: 'get',
  async handler(ctx: Context, params: Params): Promise<Result> {
    const app = ctx.app;
    const key = params.key;
    
    const value = await app.storage.get(key);
    
    return { value };
  },
};
