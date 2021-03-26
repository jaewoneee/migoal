var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var helmet = require('helmet');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var dbInfo = require('./config/mysql.json');
var passport = require('./public/lib/passport')(app);
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// 세션 저장 미들웨어
app.use(session({
  secret: 'admin',
  resave: false,
  saveUninitialized: true,
  store: new MySQLStore({
    host: dbInfo.host,
    user: dbInfo.user,
    password: dbInfo.password,
    database: dbInfo.database
  })

}))

//라우터
var loginRouter = require('./routes/login')(passport);
var joinRouter = require('./routes/join');
var goalRouter = require('./routes/goal')


app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// 로그인 페이지
app.use('/login', loginRouter);
// 회원가입 페이지
app.use('/join', joinRouter);
// 메인 페이지
app.use('/goal', goalRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;