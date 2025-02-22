import pools from '../database.js';
import { SQL_QUERIES } from './user.queries.js';
import { toCamelCase } from '../../utils/transformCase.js';

export const findUserByUserID = async (userId) => {
  const [rows] = await pools.TOWER_DEFENSE_ONLINE_DB.query(SQL_QUERIES.FIND_USER_BY_USER_ID, [userId]);
  return toCamelCase(rows[0]);
};

export const createUser = async (userId, password) => {
  await pools.TOWER_DEFENSE_ONLINE_DB.query(SQL_QUERIES.CREATE_USER, [userId, password]);
  return { userId, password };
};

export const updateUserLogin = async (highscore, win, lose, userId) => {
  await pools.TOWER_DEFENSE_ONLINE_DB.query(SQL_QUERIES.UPDATE_USER_LOGIN, [highscore, win, lose, userId]);
};

export const findUserInfoByUserID = async (userId) => {
  const [rows] = await pools.TOWER_DEFENSE_ONLINE_DB.query(SQL_QUERIES.FIND_USERINFO_BY_USER_ID, [userId]);
  return toCamelCase(rows[0]);
};

export const createUserInfo = async (userId, highscore, win, lose) => {
  await pools.TOWER_DEFENSE_ONLINE_DB.query(SQL_QUERIES.CREATE_USERINFO, [userId, highscore, win, lose]);
  return { userId, highscore, win, lose };
};

export const updateUserInfo = async (highscore, win, lose, userId) => {
  await pools.TOWER_DEFENSE_ONLINE_DB.query(SQL_QUERIES.UPDATE_USERINFO, [highscore, win, lose, userId]);
};

export const getUserHighScore = async (userId) => {
  const [rows] = await pools.TOWER_DEFENSE_ONLINE_DB.query(SQL_QUERIES.GET_USER_HIGHSCORE, [userId]);
  return rows[0].highscore || 0;
};

export const getUserHighscoreList = async (userId) => {
  const rows = await pools.TOWER_DEFENSE_ONLINE_DB.query(SQL_QUERIES.GET_USER_HIGHSCORE_LIST, [userId]);
  return rows[0] || null;
};

export const getWorldRankingList = async () => {
  const rows = await pools.TOWER_DEFENSE_ONLINE_DB.query(SQL_QUERIES.GET_WORLD_HIGHSCORE_LIST);
  return rows[0] || null;
};
