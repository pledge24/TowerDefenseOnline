import { createRecord } from '../../db/user/record.db.js';
import { getGameSession, removeGameSession } from '../../session/game.session.js';
import { getUserById } from '../../session/user.session.js';
import { getFormatDate } from '../../utils/dateFormat.js';

export const checkGameover = (userId, payload) => {
  const {} = payload;

  const session = getGameSession(userId);
  const users = session.getAllUsers();

  const defeatUser = getUserById(userId);

  if (defeatUser.BaseModel.getBaseHp(userId) !== 0) return { status: 'fail', message: 'Base is not 0 HP' };

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

  if (isWin === false) {
    return { status: 'success but lose' };
  }

  const data = [];
  const session = getGameSession(userId);
  console.log(session);
  const users = session.getAllUsers();

  if (userId === users[0].id) {
    data.push(users[1].id);
    data.push(users[0].id);
    data.push(users[1].score);
    data.push(users[0].score);
    data.push(isWin);
    data.push(session.startTime);
    data.push(getFormatDate(new Date()));
  } else {
    data.push(users[0].id);
    data.push(users[1].id);
    data.push(users[0].score);
    data.push(users[1].score);
    data.push(isWin);
    data.push(session.startTime);
    data.push(getFormatDate(new Date()));
  }

  //createRecord(data);

  removeGameSession(userId);

  return { status: 'success' };
};
