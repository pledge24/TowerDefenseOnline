class Base {
  constructor(startHp) {
    this.baseHp = startHp;
  }

  // 게임 시작 시 베이스 체력 초기화
  initializeBase = (userId) => {
    userBase[userId] = BASE_MAX_HP;
  };

  // 베이스 체력 설정
  setBaseHp = (userId, baseHp) => {
    userBase[userId] = baseHp;
  };

  // 베이스 체력 가져오기
  getBaseHp = (userId) => {
    return userBase[userId];
  };

  // 베이스 정보 삭제
  removeBase = (userId) => {
    delete userBase.userId;
  };
}

export default Base;
