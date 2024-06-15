# BobboCorp
## Backend: node.js/express med mysql - vanilla frontend
## Enkel sida med en SQLi och en XSS

### Installera:

```npm install``` <br>
Skapa en .env fil med följande info (byt ut info ofc):
```
DB_HOST=localhost
DB_USER=dinuser
DB_PASS=dittpassword
DB_NAME=BobboCorp
PORT=3000
```

Köra följande i sql-konsolen:

```
CREATE DATABASE BobboCorp;
USE BobboCorp;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO users (username, password) VALUES ('admin', 'admin123');
INSERT INTO users (username, password) VALUES ('user', 'user123');

CREATE USER 'dinuser'@'localhost' IDENTIFIED BY 'dittpassword';
GRANT ALL PRIVILEGES ON BobboCorp.* TO 'dinuser'@'localhost';
FLUSH PRIVILEGES;
```

```
node server
```

localhost:3000
