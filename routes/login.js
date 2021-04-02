//로그인 페이지
const express = require('express');
const router = express.Router();

module.exports = function (passport) {

  /* GET home page. */
  router.get('/', (req, res, next) => {
    res.render('login');
  });

  // 로그인
  router.post('/login_process',
    passport.authenticate(
      'local', {
        successRedirect: '/goal',
        failureRedirect: '/login',
        failureFlash: true
      }
    ),
    passport.authenticate('local', {
      failureFlash: 'Invalid username or password.'
    }));

  // 로그아웃
  router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy(() => {
      res.redirect('/login');
    })
  })

  return router;
}