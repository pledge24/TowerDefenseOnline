import { makeGameSession } from './game.session.js';
import { matchQueue } from './sessions.js';
import { getUserBySocket } from './user.session.js';

export const addUserInQueue = (socket, data) => {
  const user = getUserBySocket(socket);
  user.canvas = {width: data.width, height: data.height};
  matchQueue.push(user);

  // 매치 큐에 2명 이상 있다면, 큐에서 두 유저를 삭제하고, 새로운 게임 세션에 두 유저를 추가한다.
  if(matchQueue.length >= 2){
    
    const user1 = matchQueue[0];
    const user2 = matchQueue[1];
    removeUserInQueue(user1.socket);
    removeUserInQueue(user2.socket);

    // 게임 세션을 생성
    makeGameSession(user1, user2);

  }
  return user;
};

export const removeUserInQueue = (socket) => {
  const index =  matchQueue.findIndex((user) => user.socket === socket);
  if (index !== -1) {
    return matchQueue.splice(index, 1)[0];
  }
};

