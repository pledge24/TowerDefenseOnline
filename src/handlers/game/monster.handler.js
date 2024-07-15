import { getGameSession } from "../../session/game.session.js";
import { getUserBySocket } from "../../session/user.session.js";

const addSpawnedMonster = (user, data) => {
    const {monsterNumber} = data;
    return user.MonstersModel.addMonster(monsterNumber);
};

export const notifySpawnedMonster = (socket, data) => {

    const user = getUserBySocket(socket);
    //console.log("user--------", user);
    const gameSession = getGameSession(user.id);
    //console.log("gameSession--------", gameSession);
    const opponent = gameSession.users[0].id !== user.id ? gameSession.users[0] : gameSession.users[1]; 
    //console.log("opponent--------", opponent);
    const spawnedMonster = addSpawnedMonster(user, data);

    // console.log("user0's monster: ", gameSession.users[0].MonstersModel.data);
    // console.log("user1's monster: ", gameSession.users[1].MonstersModel.data);

    socket.emit('spawnMonster', spawnedMonster);
    opponent.socket.emit('spawnOpponentMonster', spawnedMonster);
    
    return { status: 'success' };
}
