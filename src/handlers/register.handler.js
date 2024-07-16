import { handleConnection, handleDisconnect, handlerEvent } from './helper.js';
import { addUserInQueue } from '../session/matchQueue.session.js';
import { monsterKill, notifySpawnedMonster, monsterAttackBase } from './game/monster.handler.js';
import { towerAttack } from './game/towerAttack.handler.js';
import { getUserBySocket } from '../session/user.session.js';
import { getGameSessionBySocket, removeGameSession, removeGameSessionBySocket } from '../session/game.session.js';
import { chat } from './ui/chat.handler.js';

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

    socket.on('attackBase', (data) => {
      monsterAttackBase(socket, data);
    });

    socket.on('room_chat', (data) => {
      chat(socket, data);
    });

    socket.on('disconnect', () => {
      const session = getGameSessionBySocket(socket);
      if (session) {
        const users = session.getAllUsers();

        users.forEach((user) => {
          let data;
          if (user.socket.id !== socket.id) {
            data = { isWin: true };
            user.socket.emit('gameOver', data);
          }
        });
      }

      handleDisconnect(socket);
    });
  });
};

export default registerHandler;
