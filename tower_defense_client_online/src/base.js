export class Base {
  constructor(x, y, maxHp) {
    // 생성자 안에서 기지의 속성을 정의한다고 생각하시면 됩니다!
    this.x = x; // 기지 이미지 x 좌표
    this.y = y; // 기지 이미지 y 좌표
    this.width = 85; // 기지 이미지 가로 길이 (이미지 파일 길이에 따라 변경 필요하며 세로 길이와 비율을 맞춰주셔야 합니다!)
    this.height = 112; // 기지 이미지 세로 길이
    this.hp = maxHp; // 기지의 현재 HP
    this.maxHp = maxHp; // 기지의 최대 HP
  }

  updateBaseHp(baseHp) {
    this.hp = baseHp;
  }

  draw(ctx, baseImage, isOpponent = false) {
    ctx.drawImage(baseImage, this.x - this.width, this.y - this.height / 2, this.width, this.height);

    if (!isOpponent) {
      ctx.font = '16px Arial';
      ctx.fillStyle = 'white';
      ctx.fillText(`HP: ${this.hp}/${this.maxHp}`, this.x - this.width - 5, this.y - this.height / 2 - 10);
    }
  }
}
