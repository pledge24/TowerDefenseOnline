import { createRecord } from '../../db/user/record.db.js';
import { findUserInfoByUserID, getUserHighScore, updateUserInfo } from '../../db/user/user.db.js';
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

export const setRecord = async (userId, payload) => {
  //data = [winner_id, loser_id, winner_score, loser_score, start_time, end_time]
  const { isWin } = payload;

  if (isWin === false) {
    return { status: 'success but no record for loser XD' };
  }

  const data = [];
  const session = getGameSession(userId);
  const users = session.getAllUsers();

  if (userId === users[0].id) {
    data.push(users[0].id);
    data.push(users[1].id);
    data.push(users[0].ScoreModel.getScore());
    data.push(users[1].ScoreModel.getScore());
    data.push(session.startTime);
    data.push(getFormatDate(new Date()));
    console.log(`${users[0].id} is win!`);

    const winnerInfo = await findUserInfoByUserID(users[0].id);
    const loserInfo = await findUserInfoByUserID(users[1].id);
    await updateUserInfo(
      Math.max(winnerInfo.highscore, users[0].ScoreModel.getScore()),
      winnerInfo.win + 1,
      winnerInfo.lose,
      users[0].id
    );
    await updateUserInfo(
      Math.max(loserInfo.highscore, users[1].ScoreModel.getScore()),
      loserInfo.win,
      loserInfo.lose + 1,
      users[1].id
    );
  } else {
    data.push(users[1].id);
    data.push(users[0].id);
    data.push(users[1].ScoreModel.getScore());
    data.push(users[0].ScoreModel.getScore());
    data.push(session.startTime);
    data.push(getFormatDate(new Date()));
    console.log(`${users[1].id} is win!`);

    const winnerInfo = await findUserInfoByUserID(users[1].id);
    const loserInfo = await findUserInfoByUserID(users[0].id);
    await updateUserInfo(
      Math.max(winnerInfo.highscore, users[1].ScoreModel.getScore()),
      winnerInfo.win + 1,
      winnerInfo.lose,
      users[1].id
    );
    await updateUserInfo(
      Math.max(loserInfo.highscore, users[0].ScoreModel.getScore()),
      loserInfo.win,
      loserInfo.lose + 1,
      users[0].id
    );
  }

  createRecord(data);

  removeGameSession(userId);
  return { status: 'success' };
};
