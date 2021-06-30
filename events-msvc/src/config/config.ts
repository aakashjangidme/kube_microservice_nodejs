import app from '../../package.json';

const config = {
  appConfig: {
    appName: app.name,
  },
  server: {
    host: 'localhost',
    port: 8002,
  },
};

export default config;
