import { createRecord } from '../../db/user/record.db.js';
import { getGameSessionByUserId } from '../../session/game.session.js';
import { getFormatDate } from '../../utils/dateFormat.js';

export const checkGameover = (userId, payload) => {
  const {} = payload;

  const session = getGameSessionByUserId(userId);
  const users = session.getAllUsers();

  users.forEach((user) => {
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
  const { isWin } = payload;

  console.log('1234');
  const data = [];
  const session = getGameSessionByUserId(userId);
  const users = session.getAllUsers();

  if (userId === users[0].id) {
    data.push(users[0].id);
    data.push(users[1].id);
    data.push(users[0].score);
    data.push(users[1].score);
    data.push(isWin);
    data.push(session.startTime);
    data.push(getFormatDate(new Date()));
  } else {
    data.push(users[1].id);
    data.push(users[0].id);
    data.push(users[1].score);
    data.push(users[0].score);
    data.push(isWin);
    data.push(session.startTime);
    data.push(getFormatDate(new Date()));
  }

  createRecord(data);

  return { status: 'success' };
};
