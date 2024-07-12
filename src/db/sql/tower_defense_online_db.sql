CREATE TABLE IF NOT EXISTS User
(
    user_id VARCHAR(36) PRIMARY KEY,
    password VARCHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS UserInfo
(
    User_id VARCHAR(36) NOT NULL,
    highscore INT,
    win INT,
    lose INT,
    FOREIGN KEY (User_id) REFERENCES User (user_id)
);

CREATE TABLE IF NOT EXISTS Record
(
    record_id INT UNIQUE AUTO_INCREMENT,
    player1_id VARCHAR(36),
    player2_id VARCHAR(36),
    player1_score INT,
    player2_score INT,
    win INT,
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)