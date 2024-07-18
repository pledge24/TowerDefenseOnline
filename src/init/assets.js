import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // 로컬 디렉토리 경로/tower_defense_online\src\init\assets.js
const __dirname = path.dirname(__filename); // 로컬 디렉토리 경로/tower_defense_online\src\init
const basePath = path.join(__dirname, '../../tower_defense_client_online/assets');

let gameAssets = {}; // 전역함수로 선언

const readFileAsync = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(basePath, filename), 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(JSON.parse(data));
    });
  });
};

export const loadGameAssets = async () => {
  try {
    const [levels, monsters, towers] = await Promise.all([
      readFileAsync('level.json'),
      readFileAsync('monster.json'),
      readFileAsync('tower.json'),
    ]);
    gameAssets = { levels, monsters, towers };
    return gameAssets;
  } catch (error) {
    throw new Error('Failed to load game assets: ' + error.message);
  }
};

export const getGameAssets = () => {
  return gameAssets;
};
