import pools from '../db/database.js';
import { testAllConnections } from '../utils/db/testConnection.js';
import initSocket from './socket.js';
import { loadGameAssets } from './assets.js';
import { getProtoMessages, loadProtos } from './loadProtos.js';

const initServer = async (server) => {
  // DB연동 테스트
  try {
    await testAllConnections(pools);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  // 게임 에셋 로드
  try {
    //리소스 로딩 하는 곳(검증할 때 사용할 예정)
    const assets = await loadGameAssets();
    //console.log(assets);
  } catch (err) {
    console.log('Failed to load game assets');
  }

  // 프로토 파일 로드
  try {
    await loadProtos();
    const protofiles = getProtoMessages();
    
    console.log(protofiles);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }

  // 웹소켓 시작.
  initSocket(server);
};

export default initServer;
