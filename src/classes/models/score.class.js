class Score {
  constructor(startScore) {
    this.data = startScore;
  }

  // 해당 유저 점수 조회
  getScore() {
    return this.data;
  }

  // 해당 유저 점수 설정
  setScore(score) {
    this.data = score;
  }

  // 해당 유저 점수 추가
  addScore(score) {
    this.data += score;
    return this.data;
  }
}

export default Score;
