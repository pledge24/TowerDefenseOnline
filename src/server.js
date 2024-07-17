import express from 'express';
import initServer from './init/index.js';
import { config } from './config/config.js';
import { createServer } from 'http';
import loginRouter from './routes/login.router.js';
import registerRouter from './routes/register.router.js';

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('tower_defense_client_online'));
app.use('/register', [registerRouter]);
app.use('/login', [loginRouter]);

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Hello World!' });
});

initServer(server)
  .then(() => {
    server.listen(config.server.port, config.server.host, async () => {
      console.log(`서버가 ${config.server.host}:${config.server.port}에서 열렸습니다`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
