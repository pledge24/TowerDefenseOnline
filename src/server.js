import net from 'net';
import initServer from './handler/init/index.js';
import { config } from './config/config.js';

const server = net.createServer();

initServer().then(() => {
    server.listen(config.server.port, config.server.host, () => {
      console.log(`서버가 ${config.server.host}:${config.server.port}에서 열렸습니다`);
    });
}).catch((err) => {
    console.error(err);
    process.exit(1);
});
