import { getUserBySocket } from '../../session/user.session.js';

const scoreUpdate = (user, data) => {
  const { monsterScore } = data;
  return user.ScoreModel.addScore(monsterScore);
};

export const updateScore = (socket, data) => {
  const user = getUserBySocket(socket);
  const updatedScore = scoreUpdate(user, data);
  const { monsterLevel } = data;
  if (updatedScore >= 2000 * monsterLevel) {
    const level = user.MonstersModel.increaseMonsterLevel();
    console.log('몬스터 레벨 증가: ', level);
  }

  socket.emit('updatedScore', { updatedScore });
};
