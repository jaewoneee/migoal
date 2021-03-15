var express = require('express');
var router = express.Router();
var db = require('../public/lib/db');
var shortid = require('shortid');


/* GET home page. */
router.get('/', function (req, res) {
  // 사용자 지정
  var user = req.session.passport.user;
  // 사용자의 목표 리스트 가져오기
  db.query('SELECT * FROM migoal WHERE _id = ?', [user.id], function (err, goals) {
    if (err) throw err;

    res.render('goals', {
      nickname: user.nickname,
      goals: goals
    });
  })

});

// 목표 생성
router.get('/add_goal', function (req, res) {
  var goalTitle = req.query.goal_title;
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
  console.log(req.session.passport.user);

  if (goalTitle && goalPeriod) {
    db.query('INSERT INTO migoal SET ?', newGoal, function (err, result) {
      if (err) throw err;
      res.redirect('/goal');
    })
  }
})

// 일별 목표 체크
router.get('/check_goal', function (req, res) {

})

// 목표 삭제
router.get('/delete_goal', function (req, res) {
  var deleteGoal = req.query.goal_id;
  db.query('DELETE FROM migoal WHERE goal_id=?', [deleteGoal], function (err, result) {
    if (err) throw err;
    res.redirect('/goal');
  })
})



module.exports = router;