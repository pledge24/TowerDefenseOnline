class Stage {
  constructor() {
    this.data = [];
  }

  getStage(){
    return this.data;
  };

  setStage(id, timestamp){
    const updatedStageInfo = this.data.push({ id, timestamp });
    return updatedStageInfo;
  };

}

export default Stage;
