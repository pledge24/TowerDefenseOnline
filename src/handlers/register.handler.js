import { handleConnection, handleDisconnect, handlerEvent } from './helper.js';
import { addUserInQueue } from '../session/matchQueue.session.js';
import { monsterKill, notifySpawnedMonster } from './game/monster.handler.js';
import { towerAttack } from './game/towerAttack.handler.js';

// 게임 매칭 시작버튼 누를 때 실행.
const registerHandler = (io) => {
  io.on('connection', async (socket) => {
    handleConnection(socket);
    socket.on('event', (data) => handlerEvent(io, socket, data));
    socket.on('joinMatchQueue', (data) => {
      addUserInQueue(socket, data);
    });

    socket.on('spawnMonster', (data) => {
      notifySpawnedMonster(socket, data);
    });

    socket.on('towerAttack', (data) => {
      towerAttack(socket, data);
    });

    socket.on('monsterKill', (data) => {
      monsterKill(socket, data);
    });

    socket.on('disconnect', (socket) => {
      handleDisconnect(socket);
    });
  });
};

export default registerHandler;
