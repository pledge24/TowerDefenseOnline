import { addSpawnedMonster, notifySpawnedMonster } from './game/monster.handler.js';
import { towerAttackHandler } from './game/towerAttack.handler.js';

const handlerMapping = {
  8: addSpawnedMonster,
  9: notifySpawnedMonster,
  10: towerAttackHandler,
};

export default handlerMapping;
