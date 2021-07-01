import cors from 'cors';
import express from 'express';
import { nextTick } from 'process';
import config from './config/config';
import { publishToQueue } from './services/mqService.old';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = config.server.port;

app.get('/', (_req, res) => {
  res
    .status(200)
    .json({ message: `Hello World from ${config.appConfig.appName}` });
});

app.post('/check-q', async (req, res, next) => {
  try {
    const { queueName, payload } = req.body;
    console.log(queueName, payload);

    await publishToQueue(queueName, payload);
    res.status(200).json({ messageSentStatus: true, queueName, payload });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
