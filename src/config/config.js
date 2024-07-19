import {
  CLIENT_VERSION,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  HOST,
  PORT,
  TOKEN_SECRET_KEY,
} from '../constants/env.js';

export const config = {
  server: {
    port: PORT,
    host: HOST,
  },
  token: {
    tokenSecretKey: TOKEN_SECRET_KEY,
  },
  client: {
    version: CLIENT_VERSION,
  },
  database: {
    name: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
  },
  game: {
    initial: {
      baseHp: 200,
      userGold: 1000,
      monsterLevel: 1,
      score: 0,
      // towerCost: 200,
      numOfInitialTowers: 3,
      monsterSpawnInterval: 1000,
    },
  },
};
