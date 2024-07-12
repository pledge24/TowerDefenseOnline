import mysql from 'mysql2/promise';
import { config } from '../config/config.js';

const { database } = config;

const createPool = (dbConfig) => {
  const pool = mysql.createPool({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.name,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  const originQuery = pool.query;

  pool.query = (sql, params) => {
    console.log(`Execution query: ${sql} ${params ? `${JSON.stringify(params)}` : ``}`);
    return originQuery.call(pool, sql, params);
  };
  return pool;
};

const pools = {
  TOWER_DEFENSE_ONLINE_DB: createPool(database),
};

export default pools;
