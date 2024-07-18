CREATE TABLE IF NOT EXISTS User
(
    user_id VARCHAR(36) PRIMARY KEY,
    password VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS UserInfo
(
    user_id VARCHAR(36) NOT NULL,
    highscore INT,
    win INT,
    lose INT,
    FOREIGN KEY (user_id) REFERENCES User (user_id)
);

CREATE TABLE IF NOT EXISTS Record
(
    record_id INT UNIQUE AUTO_INCREMENT,
    winner_id VARCHAR(36),
    loser_id VARCHAR(36),
    winner_score INT,
    loser_score INT,
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)