import { createRecord } from '../../db/user/record.db.js';
import { getGameSessionByUserId } from '../../session/game.session.js';

export const checkGameover = (userId, payload) => {
  const {} = payload;

  const users = getGameSessionByUserId(userId).getAllUsers();
  users.foreach((user) => {
    let data;
    if (user.id === userId) {
      data = { isWin: false };
    } else {
      data = { isWin: true };
    }
    user.socket.emit('gameOver', data);
  });

  return { status: 'success' };
};

export const setRecord = (userId, payload) => {
  //data = [player1_id, player2_id, player1_score, player2_score, win, start_time]
  const {} = payload;

  const data = [];

  const gameSession = getGameSessionByUserId(userId);
  const users = gameSession.getAllUsers();

  data.push(users[0].id);
  data.push(users[1].id);
  data.push(users[0].score);
  data.push(users[1].score);
  if (userId === users[0].id) data.push(1);
  else data.push(2);
  data.push(gameSession.startTime);

  createRecord(data);

  return { status: 'success' };
};
