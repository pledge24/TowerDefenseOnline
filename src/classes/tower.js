export class Tower {
  constructor(x, y) {
    // 생성자 안에서 타워들의 속성을 정의한다고 생각하시면 됩니다!
    this.x = x; // 타워 이미지 x 좌표
    this.y = y; // 타워 이미지 y 좌표
    // this.width = 78; // 타워 이미지 가로 길이 (이미지 파일 길이에 따라 변경 필요하며 세로 길이와 비율을 맞춰주셔야 합니다!)
    // this.height = 150; // 타워 이미지 세로 길이
    // this.attackPower = 40; // 타워 공격력
    // this.range = 300; // 타워 사거리
    // this.cost = cost; // 타워 구입 비용
    // this.cooldown = 0; // 타워 공격 쿨타임
    // this.beamDuration = 0; // 타워 광선 지속 시간
    // this.target = null; // 타워 광선의 목표
    // this.image = image;
    this.isUpgraded = false; // 업그레이드 여부
  }
}
