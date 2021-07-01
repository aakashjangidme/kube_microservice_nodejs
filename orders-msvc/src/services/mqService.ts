import apmq from 'amqplib/callback_api';
import config from '../config/config';

let ch: apmq.Channel | null = null;

apmq.connect(config.mq.conn_url, (err0, connection) => {
  if (err0) {
    throw err0;
  }
  connection.createChannel((err1, channel) => {
    if (err1) {
      throw err1;
    }
    ch = channel;
    ch.assertQueue('check-q');

    ch?.consume(
      'check-q',
      (msg) => {
        if (msg) {
          console.log('Message:', JSON.parse(msg?.content.toString()));
          // ch?.ack(msg);
        }
      },
      { noAck: true }
    );
  });
});

/**
 *
 * @param queueName Name of the queue to send message to.
 * @param data Payload data to send the in the given queue //TODO: Define type
 */

const publishToQueue = async (queueName: string, data: any) => {
  ch?.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
};

process.on('exit', (_code) => {
  ch?.close((err) => {
    throw err;
  });
  console.log(`Closing rabbitmq channel`);
});

export { ch, publishToQueue };
