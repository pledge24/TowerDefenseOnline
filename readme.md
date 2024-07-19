# 타워 디펜스 온라인 (1.0v 기준)

### 타워 디펜스 온라인 AWS 배포 (7. 18)
- [타워 디펜스 서버 링크(http://pledge24.shop:3000/)]

### 프로젝트 개요
- 프로젝트 명 : 타워 디펜스 게임 온라인 프로젝트
- 소개
    - 내용 : 타워를 구입하거나 몰려오는 적들을 물리쳐 기지를 지켜 상대보다 더 오래 살아 남아 승리하기
    - 제작 기간 : 2024.7.12.(금) ~ 2024.7.18.(목)

### 프로젝트 설계 및 구현

- 회원가입 로그인 기능
    - [x]  회원가입 (API)
    - [x]  로그인 (API)

- 유저 별 게임 데이터 관리
    - [x]  유저 클래스 관리

- 이벤트 구현
    - [x]  커넥션 성공 이벤트
    - [x]  상태 동기화 이벤트
        - [x]  기지 체력
        - [x]  유저 골드
        - [x]  타워 정보
        - [x]  유저 점수
    - [x]  게임 시작 이벤트
    - [x]  게임 종료 이벤트
    - [x]  타워 추가 이벤트
    - [x]  적 처치 이벤트
    - [x]  기지 체력 감소 이벤트

### ERD 
![image](https://github.com/user-attachments/assets/8856ba4c-0936-43ce-972a-dc1cb6721ba3)

### 패킷 명세서
![image](https://github.com/user-attachments/assets/7e4a72d6-3eab-4a16-a847-f552ab04ce0f)

### api 명세서
![image](https://github.com/user-attachments/assets/72e50ad8-77e1-442a-b336-91575bf08593)

### BackEnd Skills

![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![javascript](https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![node.js](https://img.shields.io/badge/node.js-5FA04E?style=for-the-badge&logo=node.js&logoColor=white)
![.env](https://img.shields.io/badge/.env-ECD53F?style=for-the-badge&logo=.env&logoColor=black)
![amazonrds](https://img.shields.io/badge/amazonrds-527FFF?style=for-the-badge&logo=amazonrds&logoColor=white)
![amazonec2](https://img.shields.io/badge/amazonec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![prettier](https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)
![git](https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white)
![github](https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white)

### 폴더 구조

```markdown

node_modules/

src/
├── classes/
│ ├── models/
│ │ ├── base.class.js
│ │ ├── game.class.js
│ │ ├── gold.class.js
│ │ ├── monster.class.js
│ │ ├── path.class.js
│ │ ├── score.class.js
│ │ └── tower.class.js
│ ├── monster.js
│ ├── tower.js
│ └── user.class.js
├── config/
│ └── config.js
├── constants/
│ └── env.js
├── db/
│ ├── migrations/
│ │ └── createSchemas.js
│ ├── sql/
│ │ └── tower_defense_online_db.sql
│ ├── user/
│ │ ├── record.db.js
│ │ ├── record.queries.js
│ │ ├── user.db.js
│ │ └── user.queries.js
│ └── database.js
├── handlers/
│ ├── game/
│ │ ├── gameover.handler.js
│ │ ├── monster.handler.js
│ │ ├── score.handler.js
│ │ └── tower.handler.js
│ ├── ui/
│ │ └── chat.handler.js
│ ├── handlerMapping.js
│ ├── helper.js
│ └── register.handler.js
├── init/
│ ├── assets.js
│ ├── index.js
│ └── socket.js
├── routes/
│ ├── login.router.js
│ └── register.router.js
├── sessions/
│ ├── game.session.js
│ ├── matchQueue.session.js
│ ├── sessions.js
│ └── user.session.js
├── utils/
│ └── db/
│ │ └── testConnection.js
│ ├── dateFormat.js
│ └── transformCase.js
└── server.js

tower_defense_client_online/
├── assets/
│ ├── level.json
│ ├── monster.json
│ └── tower.json
├── images/
│ ├── base.png
│ ├── bg.webp
│ ├── favicon.ico
│ ├── logo.png
│ ├── monster1.png
│ ├── monster2.png
│ ├── monster3.png
│ ├── monster4.png
│ ├── monster5.png
│ ├── path.png
│ └── tower.png
├── sounds/
│ ├── attacked.wav
│ ├── bgm.mp3
│ ├── lose.wav
│ └── win.wav
├── src/
│ ├── base.js
│ ├── Constants.js
│ ├── game.js
│ ├── multi_game.js
│ ├── multi_game2.js
│ ├── monster.js
│ ├── Socket.js
│ └── tower.js
├── index.html
├── login.html
├── login2.html
└── register.html
.env
.gitignore
.prettierrc
package-lock.json
package.json
readme.md
```

### 게임 방법
- 회원가입 및 로그인

- 게임 시작
  - 로그인 후 게임 플레이 버튼을 통해 게임을 시작할 수 있다.
    
- 게임 종료
  - 어느 한 플레이어의 기지의 체력이 0이 되면 게임이 종료된다.
    
- 기지
  - 초기 체력 200
  - 적이 살아서 기지와 충돌하는 경우 해당 적의 공격력만큼 기지의 체력이 감소한다.
  - 어느 한 플레이어의 기지 체력이 0이 되면 게임이 종료된다.
  
- 타워
  - 초기 타워
    - 게임 시작 시 초기 타워 3개가 랜덤으로 배치된다.
  - 타워 구입
    - 골드를 소모해 타워를 구입할 수 있다.
    - 구입한 타워는 랜덤으로 배치된다.
    - 구입 비용 : 500 골드

- 적
  - 적은 일정한 주기로 생성되어 기지를 향해 움직인다.
  - 적은 타워의 공격을 받아 체력이 0이 되면 사망한다.
  - 적이 살아서 기지와 충돌하는 경우 해당 적의 공격력만큼 기지의 체력이 감소한다.
  - 적은 시간에 따라 체력이 늘어난다.
 
- 점수
  - 적을 처치할 때마다 100점을 획득한다.
  - 게임이 끝날 때마다 해당 게임의 점수를 기록한다.
  - 최고 기록을 통해 해당 사용자의 최고 점수를 확인할 수 있다.
