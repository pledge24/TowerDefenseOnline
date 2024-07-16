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
  //console.log("user--------", user);
  const gameSession = getGameSession(user.id);
  //console.log("gameSession--------", gameSession);
  const opponent = gameSession.users[0].id !== user.id ? gameSession.users[0] : gameSession.users[1];
  //console.log("opponent--------", opponent);
  const spawnedMonster = addSpawnedMonster(user, data);

  // console.log("user0's monster: ", gameSession.users[0].MonstersModel.data);
  // console.log("user1's monster: ", gameSession.users[1].MonstersModel.data);

  socket.emit('spawnMonster', spawnedMonster);
  opponent.socket.emit('spawnOpponentMonster', spawnedMonster);

  return { status: 'success' };
};

export const monsterKill = (socket, data) => {
  const user = getUserBySocket(socket);
  const gameSession = getGameSession(user.id);
  const opponent = gameSession.users[0].id === user.id ? gameSession.users[1] : gameSession.users[0];
  const monsterIndex = removeMonster(user, data);

  // socket.emit('monsterKill', monsterIndex);
  opponent.socket.emit('opponentMonsterKill', monsterIndex);

  return { status: 'success' };
};

// 몬스터가 기지를 공격했을 때
export const monsterAttackBase = (socket, data) => {
  const user = getUserBySocket(socket);
  // const currentPower = user.MonstersModel.getMonsterPower();

  const index = data;
  const monster = user.MonstersModel.data[index];
  const monsterPower = monster.power;

  console.log('monsterPower:', monsterPower);

  /*
	// 서버의 데이터와 비교 검증
	if(attacked.level !== user.MonstersModel.currentLevel) {
	  return { status: 'fail', message: '서버와 레벨이 맞지 않습니다.' };
	}
	if (currentPower !== monsterPower) {
		return { status: 'fail', message: '서버와 레벨의 파워가 같지 않습니다.' };
	}
	*/

  // 기지의 HP를 감소
  let userBaseHp = user.BaseModel.getBaseHp();
  // console.log('baseHp Before:', userBaseHp);
  user.BaseModel.setBaseHp(userBaseHp - monsterPower);
  // userBaseHp = user.BaseModel.getBaseHp();
  //console.log('baseHp After:', userBaseHp);

  if (userBaseHp < 0) {
    user.BaseModel.setBaseHp(0);
    userBaseHp = user.BaseModel.getBaseHp();
  } // 기지 HP가 음수가 되지 않도록 조정

  //console.log('baseHpForUpdate:', userBaseHp);
  // 업데이트된 게임 상태를 클라이언트에 전송
  socket.emit('updateBaseHp', userBaseHp);

  return { status: 'success', message: '기지가 공격 당했습니다.' };
};
