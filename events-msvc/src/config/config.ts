import app from '../../package.json';
import * as dev from './config.dev.json';
import * as prod from './config.prod.json';

const appConfig = {
  appConfig: {
    appName: app.name,
  },
};

let config = {
  ...appConfig,
  ...dev,
};

if (process.env.NODE_ENV === 'production') {
  config = {
    ...appConfig,
    ...prod,
  };
}

export default config;
