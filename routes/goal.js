const express = require('express');
const db = require('../public/lib/db');
const shortid = require('shortid');
const sanitizeHTML = require('sanitize-html');
const router = express.Router();


/* GET home page. */
router.get('/', (req, res) => {
  if (!!req.session.passport) {
    const user = req.session.passport.user; // 사용자 지정

    // 사용자의 목표 리스트 가져오기
    db.query('SELECT * FROM migoal LEFT OUTER JOIN migoal_check on goal_id =_goal_id  WHERE _id = ? ORDER BY saved_at', [user.id], (err, goals) => {
      if (err) throw err;
      console.log(goals);
      res.render('goals', {
        goals: goals,
        nickname: goals.nickname
      });
    })
  } else {
    //로그인 상태 아니면 로그인 화면으로 튕겨내기
    res.redirect('/login');
  }

});

// 목표 생성
router.get('/add_goal', (req, res) => {
  const goalTitle = sanitizeHTML(req.query.goal_title);
  const goalPeriod = req.query.goal_period;
  const userID = req.session.passport.user.id;

  /*DB에 저장될 목표 정보 형식*/
  const newGoal = {
    _id: userID,
    title: goalTitle,
    period: goalPeriod,
    saved_at: new Date(),
    goal_id: shortid.generate()
  }

  if (goalTitle && goalPeriod) {
    db.query('INSERT INTO migoal SET ?', newGoal, (err, result) => {
      if (err) throw err;
      res.redirect('/goal');
    })
  }
})

// 목표 일별 체크
router.get('/check_goal', (req, res) => {
  const chkedItem = req.query.chk.join();
  const goalID = req.query.goal_id;

  /*DB에 저장될 일별 체크 여부 형식*/
  const chkedDay = {
    _goal_id: goalID,
    chk: chkedItem
  }

  db.query('SELECT chk FROM migoal_check WHERE _goal_id = ?', [goalID], (err, result) => {
    if (err) throw err;
    if (!result[0]) {
      db.query('INSERT INTO migoal_check SET ?', chkedDay, (err, result) => {
        if (err) throw err;
        res.redirect('/goal');
      })
    } else {
      db.query('UPDATE migoal_check SET chk = ? WHERE _goal_id = ?', [chkedItem, goalID], (err, result) => {
        if (err) throw err;
        res.redirect('/goal');
      })
    }
  })
})

// 목표 삭제
router.get('/delete_goal', (req, res) => {
  const deleteGoal = req.query.goal_id; //삭제할 목표의 아이디
  db.query('DELETE FROM migoal WHERE goal_id=?', [deleteGoal], (err, result) => {
    db.query('DELETE FROM migoal_check WHERE _goal_id =?', [deleteGoal], (err, result) => {
      if (err) throw err;
      res.redirect('/goal');
    })
  })
})

module.exports = router;