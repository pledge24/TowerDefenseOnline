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

export const updateUserLogin = async (userId) => {
  await pools.TOWER_DEFENSE_ONLINE_DB.query(SQL_QUERIES.UPDATE_USER_LOGIN, [userId]);
};
