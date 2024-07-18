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

  return { status: 'success', message: 'towerAttack' };

  
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
  return { status: 'success', message: 'towerBuy' };
}

export const towerRefund = (socket, data) => {
  const user = getUserBySocket(socket);
  const gameSession = getGameSession(user.id);
  const opponent = gameSession.users[0].id === user.id ? gameSession.users[1] : gameSession.users[0];
  
  const {towerIndex, towerPos} = data;
  const tower = user.TowersModel.getTower(towerIndex);

  // 해당 index의 타워가 존재하는지 체크
  if (!tower) {
    return { status: 'fail', message: 'There is No Tower' };
  }
  // 해당 위치의 타워가 존재하는지 체크
  if (tower.x !== towerPos.x || tower.y !== towerPos.y) {
    return { status: 'fail', message: 'Position is Not Matching' };
  }
  
  const towerCost = tower.isUpgraded ? 600 : 250;
  user.TowersModel.removeTower(towerIndex);
  user.GoldModel.addGold(towerCost);
  
  // 업데이트된 게임 상태를 클라이언트에 전송
  const goldNow = user.GoldModel.getGold();
  opponent.socket.emit('refundTower', {
    updateGold: goldNow,
    index: towerIndex,
  });
  
  return { status: 'success', message: 'towerRefund' };
}

export const upgradeTower = (socket, data) => {
  const user = getUserBySocket(socket);
  const gameSession = getGameSession(user.id);
  const opponent = gameSession.users[0].id === user.id ? gameSession.users[1] : gameSession.users[0];

  const {tower, towerUpgradeCost} = data;
  user.TowersModel.upgradeTower(tower);
  const updateGold = user.GoldModel.decreaseGold(towerUpgradeCost);

  socket.emit('upgradeTower', {tower, updateGold});
  opponent.socket.emit('upgradeOpponentTower', tower)
}