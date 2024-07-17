import Base from './models/base.class.js';
import Gold from './models/gold.class.js';
import Monsters from './models/monster.class.js';
import Score from './models/score.class.js';
import Stage from './models/stage.class.js';
import Towers from './models/tower.class.js';
import Path from './models/path.class.js';
import { config } from '../config/config.js';

class User {
  // 매칭 전 실행
  constructor(id, socket) {
    this.id = id;
    this.socket = socket;
    this.sequence = 0;
    this.state = 'waiting';
  }

  // 매칭 후 실행.
  gameStartInitialization() {
    this.BaseModel = new Base(config.game.initial.baseHp);
    this.GoldModel = new Gold(config.game.initial.userGold);
    this.MonstersModel = new Monsters(config.game.initial.monsterLevel);
    this.ScoreModel = new Score(config.game.initial.score);
    this.PathModel = new Path(this.canvas);
    this.TowersModel = new Towers(this.PathModel, config.game.initial.numOfInitialTowers);
    this.state = 'playing';
  }
}

export default User;
