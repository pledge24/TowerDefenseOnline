export const SQL_QUERIES = {
  FIND_USER_BY_USER_ID: 'SELECT * FROM User WHERE user_id = ?',
  CREATE_USER: 'INSERT INTO User (user_id, password) VALUES (?, ?)',
  UPDATE_USER_LOGIN: 'UPDATE User SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
};
