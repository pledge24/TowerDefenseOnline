const testDbConnection = async (pool, dbName) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS solution');
    console.log(`${dbName} 테스트 결과: ${rows[0].solution}`);
  } catch (err) {
    console.error(`${dbName} 테스트 중 오류 발생: ${err}`);
  }
};

const testAllConnections = async (pools) => {
  await testDbConnection(pools.TOWER_DEFENSE_ONLINE_DB, 'TOWER_DEFENSE_ONLINE_DB');
};

export { testDbConnection, testAllConnections };
