export const SQL_QUERIES = {
  FIND_USER_BY_USER_ID: 'SELECT * FROM User WHERE user_id = ?',
  CREATE_USER: 'INSERT INTO User (user_id, password) VALUES (?, ?)',
  UPDATE_USER_LOGIN: 'UPDATE User SET last_login = CURRENT_TIMESTAMP WHERE id = ?',

  FIND_USERINFO_BY_USER_ID: 'SELECT * FROM UserInfo WHERE user_id = ?',
  CREATE_USERINFO: 'INSERT INTO UserInfo (user_id, highscore, win, lose) VALUES (?, ?, ?, ?)',
  UPDATE_USERINFO: `UPDATE UserInfo SET highscore = ?, win = ?, lose = ? WHERE user_id = ?`,
  GET_USER_HIGHSCORE: 'SELECT * FROM UserInfo WHERE user_id = ?',
};
