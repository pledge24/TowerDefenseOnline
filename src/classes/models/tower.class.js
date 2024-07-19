import { Tower } from '../tower.js';

class Towers {
  constructor(Path, numOfInitialTowers) {
    this.data = [];
    this.placeInitialTowers(Path, numOfInitialTowers);
  }

  placeInitialTowers(Path, numOfInitialTowers) {
    for (let i = 0; i < numOfInitialTowers; i++) {
      const { x, y } = Path.getRandomPositionNearPath(200);
      const tower = new Tower(x, y);
      this.data.push(tower);
    }
  }

  addTower = (Tower) => {
    this.data.push(Tower);
  };

  removeTower = (index) => {
    this.data.splice(index, 1);
  };

  upgradeTower = (Tower) => {
    const tower = this.data.find((t) => t.x === Tower.x && t.y === Tower.y);
    if (tower) {
      tower.isUpgraded = true;
    }
  };

  getTower = (index) => {
    return this.data[index];
  };

  getUserTowers = () => {
    return this.data;
  };
}

export default Towers;
