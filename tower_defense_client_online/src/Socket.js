import { CLIENT_VERSION } from './Constants.js';
const id = 'user2';

class Socket {
  socket = null;
  userId = null;
  highScore = 0;

  constructor(userId) {
    this.socket = io('http://127.0.0.1:3000', {
      query: {
        clientVersion: CLIENT_VERSION,
        id: userId,
      },
    });

    this.socket.on('response', (data) => {
      if (data.status === 'fail') {
        console.error(data);
      } else {
        console.log('data', data);
      }
    });

    this.socket.on('connection', (data) => {
      if (data.status === 'success') {
        this.userId = data.id;
        this.highScore = data.highScore;
      }
    });
  }

  sendEvent(handlerId, payload) {
    this.socket.emit('event', {
      userId: this.userId,
      clientVersion: CLIENT_VERSION,
      handlerId,
      payload,
    });
  }

  getId() {
    console.log('this.userId', this.userId);
    return this.userId;
  }

  getHighScore() {
    return this.highScore;
  }
}

const socket = new Socket(id);

export const getSocket = () => {
  return socket;
};
