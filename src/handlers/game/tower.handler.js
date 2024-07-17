import { Tower } from '../../classes/tower.js';
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

export const towerBuy = (socket, data) => {
  const user = getUserBySocket(socket);
  const gameSession = getGameSession(user.id);
  const opponent = gameSession.users[0].id === user.id ? gameSession.users[1] : gameSession.users[0];

  const {tower, towerCost} = data;

  const goldNow = user.GoldModel.getGold();
  console.log('goldNow:', goldNow);
  let newTower;

  if (goldNow >= towerCost) {
    const newGold = goldNow - towerCost;
    user.GoldModel.setGold(newGold);

    const {x, y} = tower;
    newTower = new Tower(x,y);

    user.TowersModel.addTower(newTower);
  } else {
    console.log('Not enough Golds');
  }

  opponent.socket.emit('buyTower', newTower);
  return { status: 'success' };
}