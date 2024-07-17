import { getProtoMessages } from '../../init/loadProtos.js';
import { getNextSequence } from '../../session/user.session.js';

export const createResponse = (packetType, data = null, userId) => {
  const protoMessages = getProtoMessages();
  const Response = protoMessages.response.Response;

  const responsePayload = {
    packetType,
    timestamp: Date.now(),
    sequence: userId ? getNextSequence(userId) : 0,
    ...data,
  };

  const buffer = Response.encode(responsePayload).finish();

  // 길이 정보와 메시지를 함께 전송
  return Buffer.from(buffer);
};
