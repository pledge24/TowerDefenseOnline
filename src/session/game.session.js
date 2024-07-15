import { gameSessions } from './sessions.js';
import Game from '../classes/models/game.class.js';

export const addGameSession = () => {
  const session = new Game();
  gameSessions.push(session);
  return session;
};

export const removeGameSession = (id) => {
  const index = gameSessions.findIndex((session) => session.id === id);
  if (index !== -1) {
    return gameSessions.splice(index, 1)[0];
  }
};

export const getGameSession = (userId) => {
  return gameSessions.find((session) => session.users[0].id === userId || session.users[1].id === userId);
};

export const getGameSessionByUserId = (userId) => {
  let session;
  gameSessions.forEach((gameSession) => {
    if (gameSession.getUser(userId)) {
      session = gameSession;
    }
  });
  return session;
};

export const getAllGameSessions = () => {
  return gameSessions;
};

export const makeGameSession = (user1, user2) => {
  const gameSession = addGameSession();
  gameSession.addUser(user1);
  gameSession.addUser(user2);
};
