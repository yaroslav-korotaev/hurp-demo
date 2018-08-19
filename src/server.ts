import pino from 'pino';
import launch from 'hurp-launch';
import App from './app';
import getConfig from './get-config';

const log = pino({
  name: 'hurp-demo',
  level: 'trace',
  serializers: {
    // tslint:disable-next-line:no-unbound-method
    err: pino.stdSerializers.err,
  },
}, process.stdout);

async function main(): Promise<App> {
  const config = getConfig('HURP_DEMO', process.env);
  
  const app = new App({
    log,
    ...config,
  });
  
  return app;
}

launch(main, { log }); // tslint:disable-line:no-floating-promises
