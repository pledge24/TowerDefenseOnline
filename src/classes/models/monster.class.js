import { Monster } from '../monster.js';

class Monsters {
  constructor() {
    this.data = [];
    this.monsterKillCount = 0;
    this.currentLevel = 1;
  }

  // 몬스터가 죽었을 때 횟수 증가
  increaseMonsterKillCount() {
    this.monsterKillCount++;
  }

  // 몬스터 레벨 증가
  increaseMonsterLevel() {
    this.currentLevel++;
  }

  // 현재 몬스터 레벨 조회
  getMonsterLevel() {
    return this.currentLevel;
  }

  // 스폰된 몬스터 추가
  addMonster(monsterNumber) {
    const newMonster = new Monster(this.currentLevel, monsterNumber);
    this.data.push(newMonster);
    return newMonster;
  }

  // 사망한 몬스터 제거
  removeMonster(monsterIdx) {
    this.data.slice(monsterIdx, 1);
  }

  decreaseMonsterHp(index, tower) {
    const monster = this.data[index]
    monster.hp -= tower.attackPower;
    return monster.hp;
  }
}

export default Monsters;
