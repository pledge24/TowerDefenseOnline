export const SQL_QUERIES = {
  FIND_RECORD_BY_USER_ID: 'SELECT * FROM Record WHERE player1_id = ? OR player2_id = ?',
  CREATE_RECORD:
    'INSERT INTO Record (player1_id, player2_id, player1_score, player2_score, win, start_time) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)',
};
