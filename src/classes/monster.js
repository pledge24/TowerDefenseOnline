export class Monster {
    constructor(level, monsterNumber) {
      this.level = level; // 몬스터 레벨
      this.monsterNumber = monsterNumber;
      this.hp = 100+ (this.level*10); // 몬스터 체력
      //this.power = 10+ (this.level*1); // 몬스터 공격력
      // this.path = path; // 몬스터가 이동할 경로
      // this.currentIndex = 0; // 몬스터가 이동 중인 경로의 인덱스
      // this.x = path[0].x; // 몬스터의 x 좌표 (최초 위치는 경로의 첫 번째 지점)
      // this.y = path[0].y; // 몬스터의 y 좌표 (최초 위치는 경로의 첫 번째 지점)
      // this.speed = monsterData.speed; // 몬스터의 이동 속도
      // this.successAttack = false;
    }
}