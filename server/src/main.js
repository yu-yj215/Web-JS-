const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const PORT = 3001;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // MySQL 계정 사용자명
  password: 'yyj215', // MySQL 계정 비밀번호
  database: 'studycaffe' // 위에서 생성한 데이터베이스명
});
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 회원 가입
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 추가
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'User registered successfully' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 로그인
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 사용자 조회
    db.query('SELECT * FROM users WHERE username = ?', [username], async (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (results.length === 0) {
        res.status(401).json({ error: 'Invalid credentials' });
      } else {
        const user = results[0];
        // 비밀번호 비교
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
          console.log("로그인 요청, 승인")
          res.status(200).json({ message: 'Login successful' });
          
        } else {
          res.status(401).json({ error: 'Invalid credentials' });
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
