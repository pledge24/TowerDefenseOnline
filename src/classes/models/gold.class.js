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
}

export default Gold;