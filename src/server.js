import express from 'express';
import initServer from './init/index.js';
import { config } from './config/config.js';
import { createServer } from 'http';
import loginRouter from './routes/login.router.js';
import registerRouter from './routes/register.router.js';
import rankingRouter from './routes/ranking.router.js';
import { loadGameAssets } from './init/assets.js';

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('tower_defense_client_online'));
app.use('/register', [registerRouter]);
app.use('/login', [loginRouter]);
app.use('/rank', [rankingRouter]);

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Hello World!' });
});

initServer(server)
  .then(() => {
    server.listen(config.server.port, config.server.host, async () => {
      try {
        //리소스 로딩 하는 곳(검증할 때 사용할 예정)
        const assets = await loadGameAssets();
        //console.log(assets);
        console.log(`서버가 ${config.server.host}:${config.server.port}에서 열렸습니다`);
      } catch (err) {
        console.log('Failed to load game assets');
      }

      
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
