class Gold {
    constructor(initGold){
        this.data = initGold;
    }
    
    // 해당 유저 골드 조회
    getGold() {
      return this.data;
    };
    
    // 해당 유저 골드 설정
    setGold = (gold) => {
      this.data = gold;
    };   

    // 해당 유저 골드 추가
    addGold = (gold) => {
      this.data += gold;
      return this.data;
    }

    decreaseGold(gold) {
      this.data -= gold;
      return this.data;
    }
}

export default Gold;