//회원가입 페이지
var express = require('express');
var db = require('../public/lib/db');
var bcrypt = require('bcrypt');
var shortid = require('shortid');
var sanitizeHTML = require('sanitize-html');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('join');
});

router.post('/register', function (req, res) {
  var username = sanitizeHTML(req.body.username);
  var nickname = sanitizeHTML(req.body.nickname);
  var pwd = sanitizeHTML(req.body.password);

  // 입력된 비밀번호 암호화
  bcrypt.genSalt(10, function (err, salt) {
    if (err) throw err;
    bcrypt.hash(pwd, salt, function (err, hash) {
      if (err) throw err;

      /*DB에 저장될 유저 정보 형식*/
      var user = {
        id: shortid.generate(),
        username: username,
        pwd: hash,
        nickname: nickname,
      };

      // DB에 등록된 계정 정보 가져오기
      db.query('SELECT * FROM users', function (err, existedUser) {
        // 기존에 있는 아이디, 닉네임 담을 배열
        var usernameArray = [];
        var nicknameArray = [];

        if (err) throw err;

        // 아이디 & 닉네임 중복 체크
        for (i = 0; i < existedUser.length; i++) {
          let existedUsername = existedUser[i].username;
          let existedNickname = existedUser[i].nickname;

          usernameArray.push(existedUsername);
          nicknameArray.push(existedNickname);
        }

        if (usernameArray.includes(username)) {
          console.log('중복된 아이디입니다.');
        } else if (nicknameArray.includes(nickname)) {
          console.log('중복된 닉네임입니다.');
        } else {

          db.query('INSERT INTO users SET ?', user, function (err, newUser) {
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