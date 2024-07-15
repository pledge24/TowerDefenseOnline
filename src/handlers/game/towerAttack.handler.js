import { getUserById, getUserBySocket } from '../../session/user.session.js';

export const towerAttackHandler = (userId, payload) => {
  const { tower, monster } = payload;
  //   monster.hp -= tower.attackPower;
  const user = getUserById(userId);
  const userMonster = user.MonstersModel.getMonster(monster.monsterNumber)
  console.log(userMonster)
  userMonster.hp -= tower.attachPower;
  
  //   console.log('monsterHp: ', monster.hp);
  return { status: 'success' };
};
