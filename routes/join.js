//회원가입 페이지
const express = require('express');
const db = require('../public/lib/db');
const bcrypt = require('bcrypt');
const shortid = require('shortid');
const sanitizeHTML = require('sanitize-html');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('join');
});

router.post('/register', (req, res) => {
  const username = sanitizeHTML(req.body.username);
  const nickname = sanitizeHTML(req.body.nickname);
  const pwd = sanitizeHTML(req.body.password);

  // 입력된 비밀번호 암호화
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(pwd, salt, (err, hash) => {
      if (err) throw err;

      /*DB에 저장될 유저 정보 형식*/
      const user = {
        id: shortid.generate(),
        username: username,
        pwd: hash,
        nickname: nickname,
      };

      // DB에 등록된 계정 정보 가져오기
      db.query('SELECT * FROM users', (err, existedUser) => {
        if (err) throw err;

        // DB에 저장된 아이디와 닉네임 담을 배열
        const usernameArray = [];
        const nicknameArray = [];

        // 아이디 & 닉네임 중복 체크
        for (i = 0; i < existedUser.length; i++) {
          const existedUsername = existedUser[i].username;
          const existedNickname = existedUser[i].nickname;

          usernameArray.push(existedUsername);
          nicknameArray.push(existedNickname);
        }

        if (usernameArray.includes(username)) {
          console.log('중복된 아이디입니다.');
        } else if (nicknameArray.includes(nickname)) {
          console.log('중복된 닉네임입니다.');
        } else {

          db.query('INSERT INTO users SET ?', user, (err, newUser) => {
            if (err) throw err;
            console.log('welcome', newUser);
          })
        }
      })

    });
  });
  res.redirect('/login');
})

module.exports = router;