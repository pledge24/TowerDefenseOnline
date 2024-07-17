import { getUserBySocket } from '../../session/user.session.js';
import { getHandlerById } from '../../handlers/index.js';

const updateScore = (user, data) => {
  const { monsterScore } = data;
  return user.ScoreModel.addScore(monsterScore);
};

const updateGold = (user, data) => {
  const { monsterIndex } = data;
  const monsterGold = user.MonstersModel.getMonsterGold(monsterIndex);
  return user.GoldModel.addGold(monsterGold);
};

export const updateScoreAndGold = (socket, data) => {
  const user = getUserBySocket(socket);
  const updatedScore = updateScore(user, data);
  const currentLevel = user.MonstersModel.getMonsterLevel();
  const currentGold = updateGold(user, data);

  let updatedLevel = currentLevel;
  if (updatedScore >= 2000 * currentLevel) {
    user.MonstersModel.increaseMonsterLevel();
    updatedLevel = user.MonstersModel.getMonsterLevel();
    console.log('몬스터 레벨 증가: ', updatedLevel);
    return updatedLevel;
  }

  socket.emit('updatedScoreAndGold', { updatedScore, currentGold, updatedLevel });
};
