import { getGameSessionBySocket } from '../../session/game.session.js';

export const chat = (socket, data) => {
  const session = getGameSessionBySocket(socket);
  const users = session.getAllUsers();

  if (users[0].socket.id === socket.id) {
    data.username = users[0].id;
    users[1].socket.emit('room_chat', data);
  } else {
    data.username = users[1].id;
    users[0].socket.emit('room_chat', data);
  }
};
