import { gameSessions } from './sessions.js';
import Game from '../classes/models/game.class.js';

export const addGameSession = () => {
  const session = new Game();
  gameSessions.push(session);
  return session;
};

export const removeGameSession = (userId) => {
  const index = gameSessions.findIndex((session) => session.users[0].id === userId || session.users[1].id === userId);
  if (index !== -1) {
    gameSessions.splice(index, 1);
  }
};

export const getGameSession = (userId) => {
  return gameSessions.find((session) => session.users[0].id === userId || session.users[1].id === userId);
};

export const getAllGameSessions = () => {
  return gameSessions;
};

export const makeGameSession = (user1, user2) => {
  const gameSession = addGameSession();
  gameSession.addUser(user1);
  gameSession.addUser(user2);
};
