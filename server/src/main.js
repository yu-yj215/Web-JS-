const express = require('express');
const session = require('express-session');
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
  database: 'studycaffe' // 사용할 데이터베이스명
});

app.use(
  session({
    secret: '@mysecretkey',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 0.5 * 6 * 60 * 10000,
    },
  })
);
app.use(cors({
  origin: 'http://localhost:3000', // 클라이언트의 주소
  credentials: true, // 쿠키를 전송할 수 있도록 설정

}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 회원 가입
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 추가
    db.query('INSERT INTO users (username, password, remaining_minutes) VALUES (?, ?, ?)', [username, hashedPassword, null], (error) => {
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
          req.session.user = { userid: username };
          console.log('Session information:', req.session);
          res.json({message:"로그인 성공"}); 
          
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

app.get('/logout', async (req, res) => {
  // 세션 삭제
  console.log(req.session);
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).json({message: 'Logged out successfully'});
    }
  });
});

app.get('/check-login', async (req, res) => {
  if (req.session.user) {
    console.log(req.session.user)
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});

// 사용자 입실 퇴실 정보 조회

app.post('/check-in', async (req, res) => {
  let { remaintime, seat_Number } = req.body;
  if (req.session.user) {
    console.log(seat_Number+ "번 자리" + "입실:" + req.session.user.userid);
    db.query('UPDATE seats SET username = ?, remaining_minutes = ? WHERE seatnumber = ?', [req.session.user.userid,remaintime, seat_Number], async () => {console.log("쿼리 성공");});
    res.status(200).json({message:'입실 성공'});
  } else {
    res.status(401);
  }
});

// 퇴실
app.post('/check-out', async (req, res) => {
  try {
    const {remaintime, seat_Number } = req.body;
    const username = req.session.user.userid;
    console.log(seat_Number+ "번 자리" + "퇴실:" + req.session.user.userid);
    db.query('SELECT* FROM seats WHERE username = ?',[username], async (error, results) => {
      console.log(results);
      if(seat_Number === results[0].seatnumber) {
        db.query('UPDATE seats SET username = ?, remaining_minutes = ? WHERE seatnumber = ?',[null,null,seat_Number])
        res.status(200).json({message:'퇴실 성공'}); 
      }
      else {
        console.error(error);
        console.log("사용자와 좌석소유자 불일치");
        res.status(500).json({ error: '본인의 좌석이 아닙니다.' });
      }

    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/seat-load', async (req, res) => {
  // 좌석 불러오기
  try {
    db.query('SELECT seatnumber FROM seats WHERE username is NOT NULL', async (error, results) =>  {
      if(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (results.length === 0) {
        res.status(401).json({ error: 'Invalid credentials' });
      } else {
        console.log(results)
        res.status(200).json({list :results});
      }
    })

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });

  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
