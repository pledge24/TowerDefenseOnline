import { getFormatDate } from '../../utils/dateFormat.js';

const MAX_PLAYERS = 2;

class Game {
  constructor() {
    this.users = [];
    this.state = 'waiting'; // 'waiting', 'inProgress'
  }

  addUser(user) {
    if (this.users.length >= MAX_PLAYERS) {
      throw new Error('Game session is full');
    }
    this.users.push(user);

    if (this.users.length === MAX_PLAYERS) {
      this.startGame();
    }
  }

  getUser(userId) {
    return this.users.find((user) => user.id === userId);
  }

  getAllUsers() {
    return this.users;
  }

  removeUser(userId) {
    this.users = this.users.filter((user) => user.id !== userId);

    if (this.users.length < MAX_PLAYERS) {
      this.state = 'waiting';
    }
  }

  startGame() {
    this.state = 'inProgress';
    // 각 유저 게임 초기화
    this.users.forEach((user) => {
      user.gameStartInitialization();
    });
    this.startTime = getFormatDate(new Date());

    const user1_data = [this.users[0].id, this.users[0].PathModel, this.users[0].TowersModel, this.users[0].BaseModel, this.users[0].GoldModel];
    const user2_data = [this.users[1].id, this.users[1].PathModel, this.users[1].TowersModel, this.users[1].BaseModel, this.users[1].GoldModel];
    //console.log("user1_data", user1_data);
    //console.log("user2_data", user2_data);
    // user1.socket.emit("matchFound", JSON.parse(JSON.stringify(user2)));
    // user2.socket.emit("matchFound", JSON.parse(JSON.stringify(user1)));
    // 각 유저 클라이언트로 데이터 전송.
    this.users.forEach((user) => {
      user.socket.emit('matchFound', {
        user1_data: user1_data,
        user2_data: user2_data,
      });
    });
  }
}

export default Game;
