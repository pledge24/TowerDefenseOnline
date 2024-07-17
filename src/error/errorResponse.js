import { createResponse } from '../parser/response/createResponse.js';
import { getUserBySocket } from '../session/user.session.js';
import { ErrorCodes } from './errorCodes.js';

export const handleError = (socket, error) => {
  let errorCode;
  let message;
  console.log(error);
  if (error.code) {
    errorCode = error.code;
    message = error.message;
    console.error(`에러 코드: ${error.code}, 메시지: ${error.message}`);
  } else {
    errorCode = ErrorCodes.SOCKET_ERROR;
    message = error.message;
    console.error(`일반 에러: ${error.message}`);
  }
  const user = getUserBySocket(socket);
  const errorResponse = createResponse(-1, { success: false, message, failCode, errorCode }, user.id);
  socket.emit('response', errorResponse);
};
