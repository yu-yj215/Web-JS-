// server.js 또는 app.js
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(expressSession({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

// 여기에 사용자 모델 및 데이터베이스 연결을 추가하세요

/*passport.use(new LocalStrategy(
  (username, password, done) => {
    // 여기에 사용자 인증 로직을 추가하세요
  }
));*/


app.post('/login', (req,res) => {
    const { username, password } = req.body;
    if (username === 'yu215' && password === 'yyj215') {res.status(200).json({message:'로그인 성공'});}
    else if (username == null || password == null) {res.status(400).json({message:'잘못된 정보입니다.'});}
    else if (username === 'yu215' && password !=='yyj215') {res.status(401).json({message:'패스워드가 틀렸습니다.'});}
    else {res.status(402).json({message: '아이디가 존재하지 않습니다.'});}
  });
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // 여기에 사용자 디시리얼라이즈 로직을 추가하세요
});

// 여기에 라우트 및 기타 설정을 추가하세요

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
