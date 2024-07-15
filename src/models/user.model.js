import { User } from '../classes/user.class.js'

const players = [];

export const addPlayers = (uuid, payload) => {
  let created = new User(uuid);

  created.initializeDatas(payload);

  players.push(created);
}

export const getPlayer = (uuid) => {
  return (player[0].uuid === uuid) ? player[0] : player[1];
}

export const getPlayers = () => {
  return players;
}
