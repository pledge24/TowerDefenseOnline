import { getProtoMessages } from '../../init/loadProtos.js';

// response필드: {packetType, timestamp, sequence, data}
export const createResponse = (packetType, payload) => {
  const protoMessages = getProtoMessages();
  const Response = protoMessages.response.Response;

  const responsePayload = {
    packetType,
    timestamp: Date.now(),
    sequence,
    data: payload ? Buffer.from(JSON.stringify(payload)) : null,
  };

  const buffer = Response.encode(responsePayload).finish();

  // const packetLength = Buffer.alloc(config.packet.totalLength);
  // packetLength.writeUInt32BE(
  //   buffer.length + config.packet.totalLength + config.packet.typeLength,
  //   0,
  // );

  // const packetType = Buffer.alloc(config.packet.typeLength);
  // packetType.writeUInt8(PACKET_TYPE.NORMAL, 0);

  return buffer;
};
