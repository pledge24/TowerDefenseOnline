import { getGameSession } from "../../session/game.session.js";
import { getUserById, getUserBySocket } from "../../session/user.session.js";

export const addSpawnedMonster = (userId, payload) => {
    const {monsterNumber} = payload;
    
    const user = getUserById(userId);
    user.Monsters.addMonster(monsterNumber);

    return { status: 'success' };
};

export const notifySpawnedMonster = (userId, payload) => {

    const gameSession = getGameSession(userId);
    const opponentId = gameSession[0].id !== userId ? gameSession[0].id : userId; 
    const opponentSocket = getUserBySocket(opponentId);

    opponentSocket.emit('spawnOpponentMonster', payload);
    
    return { status: 'success' };
}