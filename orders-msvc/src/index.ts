import cors from 'cors';
import express from 'express';
import config from './config/config';
import './services/mqService';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = config.server.port;

app.get('/', (_req, res) => {
  res
    .status(200)
    .json({ message: `Hello World from ${config.appConfig.appName}` });
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
