export class Monster {
  constructor(level, monsterNumber) {
    this.level = level; // 몬스터 레벨
    this.monsterNumber = monsterNumber;
    this.hp = 100 + this.level * 10; // 몬스터 체력
    this.power = 10 + this.level * 1; // 몬스터 공격력
    this.gold = 90 + this.level * 10; // 몬스터 처치 시 받는 골드
  }

  getHp() {
    return this.power;
  }

  setHp(HP) {
    this.hp = HP;
  }

  getPower() {
    return this.power;
  }

  setPower(POWER) {
    this.power = POWER;
  }

  getGold() {
    return this.gold;
  }
}
