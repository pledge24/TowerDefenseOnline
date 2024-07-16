import { getUserBySocket } from '../../session/user.session.js';

const scoreUpdate = (user, data) => {
  const { score } = data;
  user.ScoreModel.addScore(score);
  return score;
};

export const updateScore = (socket, data) => {
  const user = getUserBySocket(socket);
  const updatedScore = scoreUpdate(user, data);

  socket.emit('updatedScore', updatedScore);
};
