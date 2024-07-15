
export class User {
  constructor(uuid) {
    this.uuid = uuid;
    this.userGold = 1000;
    this.base = null;
    this.baseHp = 300;
    this.basePosition = null;
    this.monsters  = [] ;
    this.monsterLevel = 1;
    this.monsterPath = [];
    this.initialTowerCoords = [];
    this.towers  = [] ;
    this.score  = 0 ;
    this.highScore  = 0 ;
    
    this.opponentBase = null;
    this.opponentMonsterPath = [];
    this.opponentInitialTowerCoords = [];
    this.opponentBasePosition = null;
    this.opponentMonsters = [];
    this.opponentTowers = [];
  }

  initializeData(datas) {
    this.userGold = datas.userGold,
    this.base = datas.base,
    this.basePosition = datas.basePosition,
    this.monsters = datas.monsters,
    this.monsterPath = datas.monsterPath,
    this.initialTowerCoords = datas.initialTowerCo,
    this.towers = datas.towers,
    this.score = datas.score,
    this.highScore = datas.highScore,
    
    this.opponentBase = datas.opponentBase,
    this.opponentMonsterPath = datas.opponentMonsterPath,
    this.opponentInitialTowerCoords = datas.opponentInitialTowerCoords,
    this.opponentBasePosition = datas.opponentBasePosition,
    this.opponentMonsters = datas.opponentMonsters,
    this.opponentTowers = datas.opponentTowers
  }

  get allData() {
    return {
      userGold: this.userGold,
      base: this.base,
      baseHp: this.baseHp,
      basePosition: this.basePosition,
      monsters: this.monsters,
      monsterLevel: this.monsterLevel,
      monsterPath: this.monsterPath,
      initialTowerCoords: this.initialTowerCoords,
      towers: this.towers,
      score: this.score,
      highScore: this.highScore,
      
      opponentBase: this.opponentBase,
      opponentMonsterPath: this.opponentMonsterPath,
      opponentInitialTowerCoords: this.opponentInitialTowerCoords,
      opponentBasePosition: this.opponentBasePosition,
      opponentMonsters: this.opponentMonsters,
      opponentTowers: this.opponentTowers,
    };
  }

  set changeData({ datas }) {
    this.userGold = datas.userGold,
    this.base = datas.base,
    this.baseHp = datas.baseHp,
    this.monsters = datas.monsters,
    this.monsterLevel = datas.monsterLevel,
    this.towers = datas.towers,
    this.score = datas.score,
    
    this.opponentBase = datas.opponentBase,
    this.opponentMonsters = datas.opponentMonsters,
    this.opponentTowers = datas.opponentTowers
  }


}