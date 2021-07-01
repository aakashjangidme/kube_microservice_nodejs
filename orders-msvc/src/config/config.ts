import app from '../../package.json';

const config = {
  appConfig: {
    appName: app.name,
  },
  server: {
    host: 'localhost',
    port: 8003,
  },
  mq: {
    conn_url: `amqp://localhost`,
  },
};

export default config;
