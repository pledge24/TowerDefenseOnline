import { addSpawnedMonster, notifySpawnedMonster } from "./game/monster.handler.js";

const handlerMapping = {
  8: addSpawnedMonster,
  9: notifySpawnedMonster
};

export default handlerMapping;
