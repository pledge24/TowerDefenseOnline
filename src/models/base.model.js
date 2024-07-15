const bases = {};

export const createBase = (uuid, life) => {
  bases[uuid] = 200; // 테스트 life 값 지정
};

export const getBase = (uuid) => {
  return bases[uuid];
};

export const setBase = (uuid, life) => {
  return (bases[uuid] = life);
};

export const clearBase = (uuid) => {
  bases[uuid] = 200; //초기 테스트 값
};
