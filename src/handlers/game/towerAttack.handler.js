import { getGameSession } from '../../session/game.session.js';
import { getUserById, getUserBySocket } from '../../session/user.session.js';

const decreaseMonsterHp = (user, data) => {
  const { tower, monsterIndex } = data;
  return user.MonstersModel.decreaseMonsterHp(monsterIndex, tower);
};

export const towerAttack = (socket, data) => {
  const user = getUserBySocket(socket);
  const gameSession = getGameSession(user.id);
  const opponent = gameSession.users[0].id === user.id ? gameSession.users[1] : gameSession.users[0];
  const monsterHp = decreaseMonsterHp(user, data);
  const { towerIndex, monsterIndex } = data;

  socket.emit('decreaseMonsterHp', { monsterIndex, monsterHp });
  opponent.socket.emit('decreaseOpponentMonsterHp', { monsterIndex, monsterHp, towerIndex });

  return { status: 'success' };
};
