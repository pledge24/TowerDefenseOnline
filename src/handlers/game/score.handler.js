import { getUserBySocket } from '../../session/user.session.js';

const scoreUpdate = (user, data) => {
  const { monsterScore } = data;
  return user.ScoreModel.addScore(monsterScore);
};

export const updateScore = (socket, data) => {
  const user = getUserBySocket(socket);
  const updatedScore = scoreUpdate(user, data);
  const currentLevel = user.MonstersModel.getMonsterLevel();
  if (updatedScore >= 2000 * currentLevel) {
    user.MonstersModel.increaseMonsterLevel();
    const updatedLevel = user.MonstersModel.getMonsterLevel();
    console.log('몬스터 레벨 증가: ', updatedLevel);
  }

  socket.emit('updatedScore', { updatedScore });
};
