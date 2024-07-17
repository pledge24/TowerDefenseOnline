import { getProtoMessages } from '../../init/loadProtos.js';

const createNotification = (packetType, payload) => {
  const protoMessage = getProtoMessages();
  const notificationTypeName = getProtoTypeNameBypacketType(packetType);
  if (!notificationTypeName) {
    throw new CustomError(ErrorCodes.UNKNOWN_PACKET_TYPE, `알 수 없는 패킷 타입: ${packetType}`);
  }

  // payload 프로토버프 구조 가져오고 디코딩.
  const [namespace, typeName] = notificationTypeName.split('.');
  const messageType = protoMessages[namespace][typeName];


  const message = messageType.create(data);
  const packet = messageType.encode(message).finish();

  return packet;
};
