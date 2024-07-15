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

export const getGameSession = (id) => {
  return gameSessions.find((session) => session.id === id);
};

export const getGameSessionByUserId = (userId) => {
  gameSessions.forEach((gameSession) => {
    if (gameSession.getUser(userId)) return gameSession;
  });
};

export const getAllGameSessions = () => {
  return gameSessions;
};

export const makeGameSession = (user1, user2) => {
  const gameSession = addGameSession();
  gameSession.addUser(user1);
  gameSession.addUser(user2);
};
