import { CLIENT_VERSION } from '../constants/env.js';
import handlerMappings from './handlerMapping.js';
import { addUser, removeUser } from '../session/user.session.js';
import { config } from '../config/config.js';
import jwt from 'jsonwebtoken';

export const handleDisconnect = (socket) => {
  removeUser(socket);
};

export const handleConnection = async (socket) => {

  const username = socket.handshake.auth.token.split(' ');
  const decodedToken = jwt.verify(username[1], config.token.tokenSecretKey);

  // 유저 세션에 해당 유저 추가.
  addUser(decodedToken.username, socket);

  //socket.emit('connection', { status: 'success', id});
};

export const handlerEvent = (io, socket, data) => {
  if (!CLIENT_VERSION.includes(data.clientVersion)) {
    socket.emit('response', { status: 'fail', message: 'Wrong client version' });
    return;
  }
  // 이벤트 트리거 확인용 출력문
  // console.log(`EVENT(${data.handlerId}) IS TRIGGERD! USER ID: ${data.userid}`);

  const handler = handlerMappings[data.handlerId];
  if (!handler) {
    socket.emit('response', { status: 'fail', message: 'Handler not found' });
    return;
  }

  const response = handler(data.userId, data.payload);

  if (response.broadcast) {
    io.emit('response', 'response');
    return;
  }

  socket.emit('response', response);
};
