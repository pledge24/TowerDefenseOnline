import { getGameSession } from '../../session/game.session.js';
import { getUserBySocket } from '../../session/user.session.js';

const addSpawnedMonster = (user, data) => {
  const { monsterNumber } = data;
  return user.MonstersModel.addMonster(monsterNumber);
};

const removeMonster = (user, data) => {
  const monsterIndex = data;
  user.MonstersModel.removeMonster(monsterIndex);
  return monsterIndex;
};

export const notifySpawnedMonster = (socket, data) => {
  const user = getUserBySocket(socket);

  const gameSession = getGameSession(user.id);

  const opponent = gameSession.users[0].id !== user.id ? gameSession.users[0] : gameSession.users[1];

  const spawnedMonster = addSpawnedMonster(user, data);

  socket.emit('spawnMonster', spawnedMonster);
  opponent.socket.emit('spawnOpponentMonster', spawnedMonster);

  return { status: 'success' };
};

export const monsterKill = (socket, data) => {
  const user = getUserBySocket(socket);
  const gameSession = getGameSession(user.id);
  const opponent = gameSession.users[0].id === user.id ? gameSession.users[1] : gameSession.users[0];
  const monsterIndex = removeMonster(user, data);

  opponent.socket.emit('opponentMonsterKill', monsterIndex);

  return { status: 'success' };
};

// 몬스터가 기지를 공격했을 때
export const monsterAttackBase = (socket, data) => {
  const user = getUserBySocket(socket);
  const index = data;

  // 공격한 몬스터의 공격력 확인
  const monster = user.MonstersModel.data[index];
  const monsterPower = monster.power;

	// 기지의 HP감소 적용
	let userBaseHp = user.BaseModel.getBaseHp();
	user.BaseModel.setBaseHp(userBaseHp - monsterPower);
	userBaseHp = user.BaseModel.getBaseHp();

	// 기지 HP가 음수가 되지 않도록 조정
	if (userBaseHp < 0) {
		user.BaseModel.setBaseHp(0);
		userBaseHp = user.BaseModel.getBaseHp();
	}
	
	// 업데이트된 기지 HP를 클라이언트에 전송
	socket.emit('updateBaseHp', userBaseHp);

  return { status: 'success', message: '기지가 공격 당했습니다.' };
};
