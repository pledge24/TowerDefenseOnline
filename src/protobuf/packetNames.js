export const packetNames = {
  common: {
    Packet: 'common.Packet',
    SendEvent: 'common.Packet',
  },
  game: {
    ClientMonster: 'game.ClientMonster',
    ClientMsg: 'game.ClientMsg',
    C2S_MatchGamePayload: 'game.C2S_MatchGamePayload',
    C2S_BuyTowerPayload: 'game.C2S_BuyTowerPayload',
    C2S_SpawnMonsterPayload: 'game.C2S_SpawnMonsterPayload',
    C2S_TowerAttackPayload: 'game.C2S_TowerAttackPayload',
    C2S_MonsterDiePayload: 'game.C2S_MonsterDiePayload',
    C2S_MonsterAttackPayload: 'game.C2S_MonsterAttackPayload',
    C2S_UpdateScoreAndGoldPayload: 'game.C2S_UpdateScoreAndGoldPayload',
    C2S_RoomChatPayload: 'game.C2S_RoomChatPayload',

    ServerTower: 'game.ServerTower',
    ServerMonster: 'game.ServerMonster',
    ServerMsg: 'game.ServerMonster',
    S2C_BuyTowerPayload: 'game.S2C_BuyTowerPayload',
    S2C_SpawnMonsterPayload: 'game.S2C_SpawnMonsterPayload',
    S2C_SpawnOpponentMonsterPayload: 'game.S2C_SpawnOpponentMonsterPayload',
    S2C_MonsterDiePayload: 'game.S2C_MonsterDiePayload',
    S2C_UpdateBaseHpPayload: 'game.S2C_UpdateBaseHpPayload',
    S2C_DecreaseMonsterHpPayload: 'game.S2C_DecreaseMonsterHpPayload',
    S2C_DecreaseOpponentMonsterHpPayload: 'game.S2C_DecreaseOpponentMonsterHpPayload',
    S2C_UpdateScoreAndGoldPayload: 'game.S2C_UpdateScoreAndGoldPayload',
    S2C_GameOverPayload: 'game.S2C_GameOverPayload',
    S2C_RoomChatPayload: 'game.S2C_RoomChatPayload',

    response: 'response.Response',
  },
};
