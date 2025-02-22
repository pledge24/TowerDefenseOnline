import { Base } from './base.js';
import { CLIENT_VERSION } from './Constants.js';
import { Monster } from './monster.js';
import { Tower } from './tower.js';

if (!localStorage.getItem('token')) {
  alert('로그인이 필요합니다.');
  location.href = '/login';
}

let serverSocket;
let canvas = document.getElementById('gameCanvas');
canvas.height = 500;
const ctx = canvas.getContext('2d');

let opponentCanvas = document.getElementById('opponentCanvas');
opponentCanvas.height = 500;
const opponentCtx = opponentCanvas.getContext('2d');

const progressBarContainer = document.getElementById('progressBarContainer');
const progressBarMessage = document.getElementById('progressBarMessage');
const progressBar = document.getElementById('progressBar');
const loader = document.getElementsByClassName('loader')[0];

const chat = document.getElementById('chatting-container');
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');

const NUM_OF_MONSTERS = 5; // 몬스터 개수
// 게임 데이터
let towerCost = 500; // 타워 구입 비용
let towerUpgradeCost = 700; // 타워 업그레이드 비용
let monsterSpawnInterval = 900; // 몬스터 생성 주기
let monsterInterval; // 몬스터 인터벌

// 유저 데이터
let userGold = 0; // 유저 골드
let base; // 기지 객체
let baseHp = 100; // 기지 체력 기본값
let monsterLevel = 1; // 몬스터 레벨
let monsterPath; // 몬스터 경로
let initialTowerCoords; // 초기 타워 좌표
let basePosition; // 기지 좌표
const monsters = []; // 유저 몬스터 목록
const towers = []; // 유저 타워 목록
let score = 0; // 게임 점수
let highScore = 0; // 기존 최고 점수
let userId;

// 상대 데이터
let opponentBase; // 상대방 기지 객체
let opponentMonsterPath; // 상대방 몬스터 경로
let opponentInitialTowerCoords; // 상대방 초기 타워 좌표
let opponentBasePosition; // 상대방 기지 좌표
const opponentMonsters = []; // 상대방 몬스터 목록
const opponentTowers = []; // 상대방 타워 목록

let isInitGame = false;
let isRefund = false; // 환불모드 체크
let isUpgrade = false; // 업그레이드 모드 체크

let baseX; // 기지 x좌표 보정좌표
let opponentBaseX; // 적 기지 x좌표 보정좌표

// 이미지 로딩 파트
const backgroundImage = new Image();
backgroundImage.src = 'images/bg.webp';

const towerImage = new Image();
towerImage.src = 'images/tower.png';

const upgradeTowerImage = new Image();
upgradeTowerImage.src = 'images/upgradeTower.png';

const baseImage = new Image();
baseImage.src = 'images/base.png';

const pathImage = new Image();
pathImage.src = 'images/path.png';

const monsterImages = [];
for (let i = 1; i <= NUM_OF_MONSTERS; i++) {
  const img = new Image();
  img.src = `images/monster${i}.png`;
  monsterImages.push(img);
}

let bgm;

function initMap() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); // 배경 이미지 그리기
  opponentCtx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); // 배경 이미지 그리기
  drawPath(monsterPath, ctx);
  drawPath(opponentMonsterPath, opponentCtx);
  placeInitialTowers(initialTowerCoords, towers, ctx); // 초기 타워 배치
  placeInitialTowers(opponentInitialTowerCoords, opponentTowers, opponentCtx); // 상대방 초기 타워 배치
  placeBase(basePosition, true);
  placeBase(opponentBasePosition, false);
}

function drawPath(path, context) {
  const segmentLength = 10; // 몬스터 경로 세그먼트 길이
  const imageWidth = 30; // 몬스터 경로 이미지 너비
  const imageHeight = 30; // 몬스터 경로 이미지 높이
  const gap = 3; // 몬스터 경로 이미지 겹침 방지를 위한 간격

  for (let i = 0; i < path.length - 1; i++) {
    const startX = path[i].x;
    const startY = path[i].y;
    const endX = path[i + 1].x;
    const endY = path[i + 1].y;

    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY); // 피타고라스 정리로 두 점 사이의 거리를 구함 (유클리드 거리)
    const angle = Math.atan2(deltaY, deltaX); // 두 점 사이의 각도를 tan-1(y/x)로 구해야 함 (자세한 것은 역삼각함수 참고): 삼각함수는 변의 비율! 역삼각함수는 각도를 구하는 것!

    for (let j = gap; j < distance - gap; j += segmentLength) {
      const x = startX + Math.cos(angle) * j; // 다음 이미지 x좌표 계산(각도의 코사인 값은 x축 방향의 단위 벡터 * j를 곱하여 경로를 따라 이동한 x축 좌표를 구함)
      const y = startY + Math.sin(angle) * j; // 다음 이미지 y좌표 계산(각도의 사인 값은 y축 방향의 단위 벡터 * j를 곱하여 경로를 따라 이동한 y축 좌표를 구함)
      drawRotatedImage(pathImage, x, y, imageWidth, imageHeight, angle, context);
    }
  }
}

function drawRotatedImage(image, x, y, width, height, angle, context) {
  context.save();
  context.translate(x + width / 2, y + height / 2);
  context.rotate(angle);
  context.drawImage(image, -width / 2, -height / 2, width, height);
  context.restore();

  baseX = x + width * 2;
  opponentBaseX = x + width * 2;
}

function getRandomPositionNearPath(maxDistance) {
  const segmentIndex = Math.floor(Math.random() * (monsterPath.length - 1));
  const startX = monsterPath[segmentIndex].x;
  const startY = monsterPath[segmentIndex].y;
  const endX = monsterPath[segmentIndex + 1].x;
  const endY = monsterPath[segmentIndex + 1].y;

  const t = Math.random();
  const posX = startX + t * (endX - startX);
  const posY = startY + t * (endY - startY);

  const offsetX = (Math.random() - 0.5) * 2 * maxDistance;
  const offsetY = (Math.random() - 0.5) * 2 * maxDistance;

  return {
    x: posX + offsetX,
    y: posY + offsetY,
  };
}

function placeInitialTowers(initialTowerCoords, initialTowers, context) {
  initialTowerCoords.forEach((towerCoords) => {
    const tower = new Tower(towerCoords.x, towerCoords.y);
    initialTowers.push(tower);
    tower.draw(context, towerImage);
  });
}

// 타워 신규 배치
function placeNewTower() {
  // 타워를 구입할 수 있는 자원이 있을 때 타워 구입 후 랜덤 배치
  if (userGold < towerCost) {
    alert('골드가 부족합니다.');
    return;
  } else {
    userGold -= towerCost;
    const { x, y } = getRandomPositionNearPath(200);
    const tower = new Tower(x, y);
    towers.push(tower);
    tower.draw(ctx, towerImage);

    serverSocket.emit('buyTower', { tower, towerCost });
  }
}

// 타워 판매
function refundTower() {
  if (isRefund) {
    isRefund = false;
  } else {
    isRefund = true;
    isUpgrade = false;
  }
}

// 타워 업그레이드
function upgradeTower() {
  if (isUpgrade) {
    isUpgrade = false;
  } else {
    isUpgrade = true;
    isRefund = false;
  }
}

//타워 클릭 이벤트
canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const clickY = event.clientY - rect.top;
  const towerRangeX = 30;
  const towerRangeY = 30;

  for (let i = 0; i < towers.length; i++) {
    const tower = towers[i];

    const towerCenterX = tower.x + tower.width / 2;
    const towerCenterY = tower.y + tower.height / 2;

    const deltaX = Math.abs(towerCenterX - clickX);
    const deltaY = Math.abs(towerCenterY - clickY);

    if (deltaX <= towerRangeX && deltaY <= towerRangeY && isRefund) {
      towers.splice(i, 1);
      serverSocket.emit('refundTower', { towerIndex: i, towerPos: { x: tower.x, y: tower.y } });
    }

    if (deltaX <= towerRangeX && deltaY <= towerRangeY && isUpgrade) {
      if (tower.isUpgraded) {
        alert('이미 업그레이드가 된 타워입니다.');
      } else if (userGold < towerUpgradeCost) {
        alert('골드가 부족합니다.');
      } else {
        serverSocket.emit('upgradeTower', { tower, towerUpgradeCost });
      }
    }
  }
});

// 나의기지 및 상대기지 위치보정
function placeBase(position, isPlayer) {
  if (isPlayer) {
    base = new Base(baseX, position.y, baseHp);
    base.draw(ctx, baseImage);
  } else {
    opponentBase = new Base(opponentBaseX, position.y, baseHp);
    opponentBase.draw(opponentCtx, baseImage, true);
  }
}

function spawnMonster() {
  // TODO. 서버로 몬스터 생성 이벤트 전송
  const monsterNumber = Math.floor(Math.random() * monsterImages.length);
  serverSocket.emit('spawnMonster', { monsterNumber });
}

function gameLoop() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); // 배경 이미지 다시 그리기
  drawPath(monsterPath, ctx); // 경로 다시 그리기

  ctx.font = '25px Times New Roman';
  ctx.fillStyle = 'skyblue';
  ctx.fillText(`최고 기록: ${highScore}`, 100, 50); // 최고 기록 표시
  ctx.fillStyle = 'white';
  ctx.fillText(`점수: ${score}`, 100, 100); // 현재 스코어 표시
  ctx.fillStyle = 'yellow';
  ctx.fillText(`골드: ${userGold}`, 100, 150); // 골드 표시
  ctx.fillStyle = 'black';
  ctx.fillText(`현재 레벨: ${monsterLevel}`, 100, 200); // 최고 기록 표시

  if (isRefund) {
    ctx.fillStyle = 'black';
    ctx.fillText(`타워 환불 모드 ON`, 800, 150);
  }

  if (isUpgrade) {
    ctx.fillStyle = 'black';
    ctx.fillText(`타워 업그레이드 모드 ON`, 800, 150);
  }

  // 타워 그리기 및 몬스터 공격 처리
  towers.forEach((tower, towerIndex) => {
    tower.draw(ctx, tower.isUpgraded ? upgradeTowerImage : towerImage);
    tower.updateCooldown();
    monsters.forEach((monster, monsterIndex) => {
      const distance = Math.sqrt(Math.pow(tower.x - monster.x, 2) + Math.pow(tower.y - monster.y, 2));
      if (distance < tower.range && tower.cooldown === 0) {
        tower.attack(monster);
        serverSocket.emit('towerAttack', { tower, towerIndex, monsterIndex });
      }
    });
  });

  // 몬스터가 공격을 했을 수 있으므로 기지 다시 그리기
  base.draw(ctx, baseImage);

  for (let i = monsters.length - 1; i >= 0; i--) {
    const monster = monsters[i];
    if (monster.hp > 0) {
      monster.draw(ctx); // 몬스터 그리기
      const Attacked = monster.move();
      if (Attacked) {
        const attackedSound = new Audio('../sounds/attacked.wav');
        attackedSound.volume = 0.3;
        attackedSound.play();
        // TODO. 몬스터가 기지를 공격했을 때 서버로 이벤트 전송
        monsters.splice(i, 1);
        serverSocket.emit('attackBase', i);
        serverSocket.emit('removeMonster', i);
      }
    } else {
      // TODO. 몬스터 사망 이벤트 전송
      monsters.splice(i, 1);
      serverSocket.emit('removeMonster', i);
      serverSocket.emit('updateScoreAndGold', { monsterScore: monster.score, monsterIndex: i });
    }
  }

  // 상대방 게임 화면 업데이트
  opponentCtx.drawImage(backgroundImage, 0, 0, opponentCanvas.width, opponentCanvas.height);
  drawPath(opponentMonsterPath, opponentCtx); // 상대방 경로 다시 그리기

  opponentTowers.forEach((tower) => {
    tower.draw(opponentCtx, tower.isUpgraded ? upgradeTowerImage : towerImage);
    tower.updateCooldown(); // 적 타워의 쿨다운 업데이트
  });

  opponentMonsters.forEach((monster) => {
    monster.move();
    monster.draw(opponentCtx, true);
  });

  opponentBase.draw(opponentCtx, baseImage, true);

  requestAnimationFrame(gameLoop); // 지속적으로 다음 프레임에 gameLoop 함수 호출할 수 있도록 함
}

function initGame(myData, opponentData) {
  if (isInitGame) {
    return;
  }
  bgm = new Audio('sounds/bgm.mp3');
  bgm.loop = true;
  bgm.volume = 0.2;
  bgm.play();

  document.getElementById('chatting-container').style.display = 'flex';
  document.getElementById('messageForm').style.display = 'flex';

  // 나와 상대의 데이터 초기화.
  userId = myData.id;

  monsterPath = myData.path.data;
  opponentMonsterPath = opponentData.path.data;

  basePosition = monsterPath[monsterPath.length - 1];
  opponentBasePosition = opponentMonsterPath[opponentMonsterPath.length - 1];

  initialTowerCoords = myData.towers.data;
  opponentInitialTowerCoords = opponentData.towers.data;

  baseHp = myData.base.baseHp;
  userGold = myData.gold.data;

  initMap(); // 맵 초기화 (배경, 몬스터 경로 그리기)

  monsterInterval = setInterval(spawnMonster, monsterSpawnInterval, 3000); // 설정된 몬스터 생성 주기마다 몬스터 생성
  gameLoop(); // 게임 루프 최초 실행
  isInitGame = true;
}

const sendEvent = (handlerId, data) => {
  serverSocket.emit('event', {
    userId,
    clientVersion: CLIENT_VERSION,
    handlerId,
    payload: data,
  });
};

// 이미지 로딩 완료 후 서버와 연결하고 게임 초기화
Promise.all([
  new Promise((resolve) => (backgroundImage.onload = resolve)),
  new Promise((resolve) => (towerImage.onload = resolve)),
  new Promise((resolve) => (baseImage.onload = resolve)),
  new Promise((resolve) => (pathImage.onload = resolve)),
  ...monsterImages.map((img) => new Promise((resolve) => (img.onload = resolve))),
]).then(() => {
  serverSocket = io('http://127.0.0.1:3000', {
    auth: {
      token: localStorage.getItem('token'),
    },
  });

  serverSocket.on('connect_error', (err) => {
    if (err.message === 'Authentication error') {
      alert('잘못된 토큰입니다.');
      location.href = '/login';
    }
  });

  serverSocket.on('connect', () => {
    // TODO. 서버와 연결되면 대결 대기열 큐 진입
    console.log('um');
    serverSocket.emit('joinMatchQueue', { width: canvas.width, height: canvas.height });
  });

  serverSocket.on('matchFound', (data) => {
    const myData = data.user1_data.socketId === serverSocket.id ? data.user1_data : data.user2_data;
    const opponentData = data.user1_data.socketId !== serverSocket.id ? data.user1_data : data.user2_data;

    if (opponentData) {
      console.log('matchFound is successfully process! Opponent:', opponentData.id);
    }

    // 상대가 매치되면 3초 뒤 게임 시작
    progressBarMessage.textContent = '게임이 3초 뒤에 시작됩니다.';

    let progressValue = 0;
    const progressInterval = setInterval(() => {
      progressValue += 10;
      progressBar.value = progressValue;
      progressBar.style.display = 'block';
      loader.style.display = 'none';

      if (progressValue >= 100) {
        clearInterval(progressInterval);
        progressBarContainer.style.display = 'none';
        progressBar.style.display = 'none';
        buyTowerButton.style.display = 'block';
        refundTowerButton.style.display = 'block';
        upgradeTowerButton.style.display = 'block';
        canvas.style.display = 'block';
        opponentCanvas.style.display = 'block';

        // TODO. 유저 및 상대방 유저 데이터 초기화
        if (!isInitGame) {
          initGame(myData, opponentData);
        }
      }
    }, 300);
  });

  // 내 몬스터 스폰 이벤트 수신
  serverSocket.on('spawnMonster', (monster) => {
    const newMonster = new Monster(monsterPath, monsterImages, monster.level, monster.monsterNumber);
    monsters.push(newMonster);
    // console.log("multi_game1(me): monster spawned!");
  });

  // 상대 몬스터 스폰 이벤트 수신
  serverSocket.on('spawnOpponentMonster', (monster) => {
    console.log('opponent(multi_game2) spawned monster');
    const newMonster = new Monster(opponentMonsterPath, monsterImages, monster.level, monster.monsterNumber);
    opponentMonsters.push(newMonster);
  });

  // 내 타워가 몬스터 공격했을 때 이벤트
  serverSocket.on('decreaseMonsterHp', (data) => {
    const { monsterIndex, monsterHp } = data;
    monsters[monsterIndex].hp = monsterHp;
  });

  // 상대 타워가 몬스터 공격했을 때 이벤트
  serverSocket.on('decreaseOpponentMonsterHp', (data) => {
    const { monsterIndex, monsterHp, towerIndex } = data;
    opponentTowers[towerIndex].attack(opponentMonsters[monsterIndex]);
    opponentMonsters[monsterIndex].hp = monsterHp;
  });

  // 타워 구입시 이벤트
  serverSocket.on('buyTower', (data) => {
    const { x, y } = data;
    const purchased = new Tower(x, y);

    opponentTowers.push(purchased);
    purchased.draw(opponentCtx, towerImage);
  });

  // 타워 판매시 이벤트
  serverSocket.on('refundTower', (data) => {
    const { updateGold, index } = data;

    if (index !== undefined) {
      opponentTowers.splice(index, 1);
    } else {
      console.log('!! refund Error !!');
    }

    userGold += updateGold;
  });

  // 타워 업그레이드시 이벤트
  serverSocket.on('upgradeTower', (data) => {
    const { tower, updateGold } = data;
    const upgradeTower = towers.find((t) => t.x === tower.x && t.y === tower.y);
    upgradeTower.isUpgraded = true;
    upgradeTower.attackPower = 60;
    upgradeTower.range = 300;
    userGold = updateGold;
  });

  // 상대 타워 업그레이드시 이벤트
  serverSocket.on('upgradeOpponentTower', (data) => {
    const opponentTower = opponentTowers.find((t) => t.x === data.x && t.y === data.y);
    opponentTower.isUpgraded = true;
  });

  // 상대가 몬스터 처치 시 이벤트
  serverSocket.on('removeOpponentMonster', (data) => {
    const monsterIndex = data;
    opponentMonsters.splice(monsterIndex, 1);
  });

  // 기지 HP 업데이트 이벤트 수신
  serverSocket.on('updateBaseHp', (data) => {
    baseHp = data;
    base.updateBaseHp(baseHp);
    if (base.hp <= 0) {
      sendEvent(31, {});
    }
  });

  // 몬스터 처치 시 점수, 골드, 레벨 증가
  serverSocket.on('updatedScoreAndGold', (data) => {
    score = data.updatedScore;
    userGold = data.currentGold;
    monsterLevel = data.updatedLevel;
  });

  serverSocket.on('gameOver', (data) => {
    bgm.pause();
    const { isWin } = data;
    const winSound = new Audio('sounds/win.wav');
    const loseSound = new Audio('sounds/lose.wav');
    winSound.volume = 0.1;
    loseSound.volume = 0.1;
    clearInterval(monsterInterval);
    if (isWin) {
      winSound.play().then(() => {
        alert('당신이 게임에서 승리했습니다!');
        // TODO. 게임 종료 이벤트 전송
        sendEvent(32, { isWin });
        location.reload();
      });
    } else {
      loseSound.play().then(() => {
        alert('아쉽지만 대결에서 패배하셨습니다! 다음 대결에서는 꼭 이기세요!');
        // TODO. 게임 종료 이벤트 전송
        sendEvent(32, { isWin });
        location.reload();
      });
    }
  });

  serverSocket.on('room_chat', (data) => {
    appendMessage(`[${data.username}] ${data.msg}`);
  });
});

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const msg = messageInput.value;
  if (msg) {
    const messageElement = document.createElement('div');
    messageElement.id = 'chat';
    messageElement.textContent = `[${userId}] ${msg}`;
    chat.appendChild(messageElement);
    messageInput.value = '';
    chat.scrollTop = chat.scrollHeight;
    serverSocket.emit('room_chat', { msg });
  }
});

const appendMessage = (content, className = 'message') => {
  const div = document.createElement('div');
  div.id = 'enemy-chat';
  div.className = className;
  div.textContent = content;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
};

const buyTowerButton = document.createElement('button');
buyTowerButton.textContent = '타워 구입';
buyTowerButton.style.position = 'absolute';
buyTowerButton.style.top = '10px';
buyTowerButton.style.right = '350px';
buyTowerButton.style.padding = '10px 20px';
buyTowerButton.style.fontSize = '16px';
buyTowerButton.style.cursor = 'pointer';
buyTowerButton.style.display = 'none';

buyTowerButton.addEventListener('click', placeNewTower);
document.body.appendChild(buyTowerButton);

const refundTowerButton = document.createElement('button');
refundTowerButton.textContent = '타워 환불';
refundTowerButton.style.position = 'absolute';
refundTowerButton.style.top = '10px';
refundTowerButton.style.right = '220px';
refundTowerButton.style.padding = '10px 20px';
refundTowerButton.style.fontSize = '16px';
refundTowerButton.style.cursor = 'pointer';
refundTowerButton.style.display = 'none';

refundTowerButton.addEventListener('click', refundTower);
document.body.appendChild(refundTowerButton);

const upgradeTowerButton = document.createElement('button');
upgradeTowerButton.textContent = '타워 업그레이드';
upgradeTowerButton.style.position = 'absolute';
upgradeTowerButton.style.top = '10px';
upgradeTowerButton.style.right = '45px';
upgradeTowerButton.style.padding = '10px 20px';
upgradeTowerButton.style.fontSize = '16px';
upgradeTowerButton.style.cursor = 'pointer';
upgradeTowerButton.style.display = 'none';

upgradeTowerButton.addEventListener('click', upgradeTower);
document.body.appendChild(upgradeTowerButton);

export { sendEvent };
