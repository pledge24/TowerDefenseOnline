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

  // 몬스터 체력 설정
  setMonsterHp(index) {
    this.data[index].hp = 100 + this.currentLevel * 10;
  }

  // 현재 몬스터 체력 조회
  getMonsterHp(index) {
    return this.data[index].getHp();
  }

  // 몬스터 공격력 설정
  increaseMonsterPower(index) {
    this.data[index].power = 10 + this.currentLevel * 1;
  }
  // 현재 몬스터 공격력 조회
  getMonsterPower(index) {
    return this.data[index].getPower();
  }

  // 스폰된 몬스터 추가
  addMonster(monsterNumber) {
    const newMonster = new Monster(this.currentLevel, monsterNumber);
    this.data.push(newMonster);
    return newMonster;
  }

  // 사망한 몬스터 제거
  removeMonster(monsterIdx) {
    return this.data.splice(monsterIdx, 1)[0];
  }

  decreaseMonsterHp(index, tower) {
    
    const monster = this.data[index];
    monster.hp -= tower.attackPower;
    return monster.hp;
  }
}

export default Monsters;
