export const SQL_QUERIES = {
  FIND_RECORD_BY_USER_ID: 'SELECT * FROM Record WHERE player1_id = ? OR player2_id = ?',
  CREATE_RECORD:
    'INSERT INTO Record (winner_id, loser_id, winner_score, loser_score, start_time, end_time) VALUES (?, ?, ?, ?, ?, ?)',
};
