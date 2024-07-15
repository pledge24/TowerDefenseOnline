class Path {
  constructor(canvas) {
    this.data = this.generateRandomMonsterPath(canvas);
  }

  generateRandomMonsterPath(canvas) {
    const path = [];
    let currentX = 0;
    let currentY = Math.floor(Math.random() * 21) + 500; // 500 ~ 520 범위의 y 시작

    path.push({ x: currentX, y: currentY });

    while (currentX < canvas.width) {
      currentX += Math.floor(Math.random() * 100) + 50; // 50 ~ 150 범위의 x 증가
      if (currentX > canvas.width) {
        currentX = canvas.width;
      }

      currentY += Math.floor(Math.random() * 200) - 100; // -100 ~ 100 범위의 y 변경
      if (currentY < 0) {
        currentY = 0;
      }
      if (currentY > canvas.height) {
        currentY = canvas.height;
      }

      path.push({ x: currentX, y: currentY });
    }

    //console.log(path);
    return path;
  }

  getRandomPositionNearPath(maxDistance) {
    const segmentIndex = Math.floor(Math.random() * (this.data.length - 1));
    const startX = this.data[segmentIndex].x;
    const startY = this.data[segmentIndex].y;
    const endX = this.data[segmentIndex + 1].x;
    const endY = this.data[segmentIndex + 1].y;
  
    const t = Math.random();
    const posX = startX + t * (endX - startX);
    const posY = startY + t * (endY - endY);
  
    const offsetX = (Math.random() - 0.5) * 2 * maxDistance;
    const offsetY = (Math.random() - 0.5) * 2 * maxDistance;
  
    return {
      x: posX + offsetX,
      y: posY + offsetY,
    };
  }
}

export default Path;
