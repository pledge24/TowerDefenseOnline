import { getProtoMessages } from '../../init/loadProtos.js';
import { getProtoTypeNameBypacketType } from '../../handlers/index.js';
import { config } from '../../config/config.js';
import CustomError from '../error/customError.js';
import { ErrorCodes } from '../error/errorCodes.js';

// 서버가 받는 request패킷을 파싱.
export const packetParser = (data) => {
  // 프로토버프 구조 가져오기
  const protoMessages = getProtoMessages();

  // 공통 패킷 구조를 디코딩
  const Packet = protoMessages.common.Packet;
  let packet;
  try {
    packet = Packet.decode(data);
  } catch (e) {
    throw new CustomError(ErrorCodes.PACKET_DECODE_ERROR, '패킷 디코딩 중 오류가 발생했습니다.');
  }

  const packetType = packet.packetType;
  const version = packet.version;
  const sequence = packet.sequence;

  // 클라이언트가 전송한 패킷의 version과 일치하는 지 검증.
  if (version !== config.client.version) {
    throw new CustomError(
      ErrorCodes.CLIENT_VERSION_MISMATCH,
      '클라이언트 버전이 일치하지 않습니다.',
    );
  }

  // 패킷 타입으로 프로토버프 구조 가져오기.
  const protoTypeName = getProtoTypeNameBypacketType(packetType);
  if (!protoTypeName) {
    throw new CustomError(ErrorCodes.UNKNOWN_PACKET_TYPE, `알 수 없는 패킷 타입: ${packetType}`);
  }

  // payload 프로토버프 구조 가져오고 디코딩.
  const [namespace, typeName] = protoTypeName.split('.');
  const PayloadType = protoMessages[namespace][typeName];
  let payload;

  try {
    payload = PayloadType.decode(packet.payload);
  } catch (e) {
    throw new CustomError(ErrorCodes.PACKET_DECODE_ERROR, '패킷 디코딩 중 오류가 발생했습니다.');
  }

  // 페이로드 타입 검증
  const errorMessage = PayloadType.verify(payload);
  if (errorMessage) {
    throw new CustomError(
      ErrorCodes.INVALID_PACKET,
      `패킷 구조가 일치하지 않습니다: ${errorMessage}`,
    );
  }

  // 필드가 비어있는 경우 = 필수 필드가 누락된 경우
  const expectedFields = Object.keys(PayloadType.fields);
  const actualFields = Object.keys(payload);
  const missingFields = expectedFields.filter((field) => !actualFields.includes(field));

  if (missingFields.length > 0) {
    throw new CustomError(
      ErrorCodes.MISSING_FIELDS,
      `필수 필드가 누락되었습니다: ${missingFields.join(', ')}`,
    );
  }

  return { packetType, sequence, payload };
};
