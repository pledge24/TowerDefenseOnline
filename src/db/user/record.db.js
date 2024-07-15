import pools from '../database.js';
import { SQL_QUERIES } from './record.queries.js';
import { toCamelCase } from '../../utils/transformCase.js';

export const findRecordByUserID = async (userId) => {
  const [rows] = await pools.TOWER_DEFENSE_ONLINE_DB.query(SQL_QUERIES.FIND_RECORD_BY_USER_ID, [userId, userId]);
  return toCamelCase(rows[0]);
};

export const createRecord = async (data) => {
  await pools.TOWER_DEFENSE_ONLINE_DB.query(SQL_QUERIES.CREATE_RECORD, data);
  return { player1_id, player2_id, player1_score, player2_score, win, start_time };
};
