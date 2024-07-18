import pools from '../db/database.js';
import { testAllConnections } from '../utils/db/testConnection.js';
import initSocket from './socket.js';

const initServer = async (server) => {
  // DB연동 테스트
  try {
    await testAllConnections(pools);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  // 웹소켓 시작.
  initSocket(server);
};

export default initServer;
