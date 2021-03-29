var express = require('express');
var db = require('../public/lib/db');
var shortid = require('shortid');
var sanitizeHTML = require('sanitize-html');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res) {
  if (!!req.session.passport) {
    var user = req.session.passport.user;  // 사용자 지정

    // 사용자의 목표 리스트 가져오기
    db.query('SELECT * FROM migoal LEFT OUTER JOIN migoal_check on goal_id =_goal_id  WHERE _id = ?', [user.id], function (err, goals) {
      if (err) throw err;
      res.render('goals', {
        goals: goals
      });
    })
  } else {
    //로그인 상태 아니면 로그인 화면으로 튕겨내기
    res.redirect('/login');
  }

});

// 목표 생성
router.get('/add_goal', function (req, res) {
  var goalTitle = sanitizeHTML(req.query.goal_title);
  var goalPeriod = req.query.goal_period;
  var userID = req.session.passport.user.id;

  /*DB에 저장될 목표 정보 형식*/
  var newGoal = {
    _id: userID,
    title: goalTitle,
    period: goalPeriod,
    saved_at: new Date(),
    goal_id: shortid.generate()
  }

  if (goalTitle && goalPeriod) {
    db.query('INSERT INTO migoal SET ?', newGoal, function (err, result) {
      if (err) throw err;
      res.redirect('/goal');
    })
  }
})

// 목표 일별 체크
router.get('/check_goal', function (req, res) {
  var chkedItem = req.query.chk.join();
  var goalID = req.query.goal_id;

  /*DB에 저장될 일별 체크 여부 형식*/
  var chkedDay = {
    _goal_id: goalID,
    chk: chkedItem
  }

  db.query('SELECT chk FROM migoal_check WHERE _goal_id = ?', [goalID], function (err, result) {
    if (err) throw err;
    if (!result[0]) {
      db.query('INSERT INTO migoal_check SET ?', chkedDay, function (err, result) {
        if (err) throw err;
        res.redirect('/goal');
      })
    } else {
      db.query('UPDATE migoal_check SET chk = ? WHERE _goal_id = ?', [chkedItem, goalID], function (err, result) {
        if (err) throw err;
        res.redirect('/goal');
      })
    }
  })
})

// 목표 삭제
router.get('/delete_goal', function (req, res) {
  var deleteGoal = req.query.goal_id; //삭제할 목표의 아이디
  db.query('DELETE FROM migoal WHERE goal_id=?', [deleteGoal], function (err, result) {
    db.query('DELETE FROM migoal_check WHERE _goal_id =?', [deleteGoal], function (err, result) {
      if (err) throw err;
      res.redirect('/goal');
    })
  })
})

module.exports = router;