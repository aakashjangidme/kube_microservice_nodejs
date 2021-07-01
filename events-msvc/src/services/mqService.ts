import apmq from 'amqplib/callback_api';
import config from '../config/config';

let ch: apmq.Channel | null = null;

const handleError = (err: any) => {
  console.error(`[x] [MQService] ${err}`);
  process.exit(1);
};

apmq.connect(config.mq.conn_url, (connErr, connection) => {
  if (connErr) {
    handleError(connErr);
  }
  connection.createChannel((chError, channel) => {
    if (chError) {
      handleError(chError);
    }
    ch = channel;
    ch.assertQueue('check-q');
  });
});

/**
 *
 * @param queueName Name of the queue to send message to.
 * @param data Payload data to send the in the given queue //TODO: Define type
 */

export const publishToQueue = async (queueName: string, data: any) => {
  ch?.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
};

process.on('exit', (_code) => {
  ch?.close((err) => {
    throw err;
  });
  console.log(`Closing rabbitmq channel`);
});
