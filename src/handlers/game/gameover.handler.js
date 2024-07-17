import { createRecord } from '../../db/user/record.db.js';
import CustomError from '../../error/customError.js';
import { handleError } from '../../error/errorResponse.js';
import { getGameSession, removeGameSession } from '../../session/game.session.js';
import { getUserById } from '../../session/user.session.js';
import { getFormatDate } from '../../utils/dateFormat.js';

export const checkGameover = (userId, payload) => {
  try {
    const {} = payload;

    const session = getGameSession(userId);
    if (!session) {
      throw new CustomError(ErrorCodes.GAME_NOT_FOUND, '게임 세션을 찾을 수 없습니다.');
    }

    const users = session.getAllUsers();
    if (!users) {
      throw new CustomError(ErrorCodes.USER_NOT_FOUND, '유저를 찾을 수 없습니다.');
    }

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
  } catch (error) {
    handleError(socket, error);
  }
};

export const setRecord = (userId, payload) => {
  //data = [winner_id, loser_id, winner_score, loser_score, start_time, end_time]
  const { isWin } = payload;

  if (isWin === false) {
    return { status: 'success but no record for loser XD' };
  }

  const data = [];
  const session = getGameSession(userId);
  console.log(session);
  const users = session.getAllUsers();

  if (userId === users[0].id) {
    data.push(users[0].id);
    data.push(users[1].id);
    data.push(users[0].ScoreModel.getScore());
    data.push(users[1].ScoreModel.getScore());
    data.push(session.startTime);
    data.push(getFormatDate(new Date()));
  } else {
    data.push(users[1].id);
    data.push(users[0].id);
    data.push(users[1].ScoreModel.getScore());
    data.push(users[0].ScoreModel.getScore());
    data.push(session.startTime);
    data.push(getFormatDate(new Date()));
  }

  createRecord(data);

  removeGameSession(userId);

  return { status: 'success' };
};
