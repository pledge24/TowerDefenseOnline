//import { addSpawnedMonster, notifySpawnedMonster } from './game/monster.handler.js';
import { checkGameover, setRecord } from './game/gameover.handler.js';
// import { monsterAttackBase } from "./game/monster.handler.js";

const handlerMapping = {
  // 8: addSpawnedMonster,
  // 9: notifySpawnedMonster,
  // 12: monsterAttackBase,
  31: checkGameover,
  32: setRecord,
};

export default handlerMapping;
