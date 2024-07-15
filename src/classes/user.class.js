import Base from './models/base.class.js';
import Gold from './models/gold.class.js';
import Monsters from './models/monster.class.js';
import Score from './models/score.class.js';
import Stage from './models/stage.class.js';
import Towers from './models/tower.class.js';
import Path from './models/path.class.js';

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
    this.BaseModel = new Base(100);
    this.GoldModel = new Gold(3000);
    this.MonstersModel = new Monsters();
    this.ScoreModel = new Score(0);
    this.StageModel = new Stage();
    this.PathModel = new Path(this.canvas);
    this.TowersModel = new Towers(this.PathModel, 3);
    this.state = 'playing';
  }
}

export default User;
