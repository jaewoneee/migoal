//로그인 페이지
const express = require('express');
const router = express.Router();

module.exports = function (passport) {

  /* GET home page. */
  router.get('/', function (req, res, next) {
    res.render('login');
  });

  // 로그인
  router.post('/login_process',
    passport.authenticate(
      'local', {
        successRedirect: '/goal',
        failureRedirect: '/login',
        failureFlash: false
      }
    )
  );

  // 로그아웃
  router.get('/logout', function (req, res) {
    req.logout();
    req.session.destroy(function () {
      res.redirect('/login');
    })
  })
  return router;
}