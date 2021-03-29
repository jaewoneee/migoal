const db = require('./db');
const bcrypt = require('bcrypt');


module.exports = function (app) {

    var passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy;

    /*passport를 사용하겠다는 선언*/
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, done) {
        console.log('serializeUser', user);
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        console.log('[DeserializeUser]', user);
        db.query( 'SELECT * FROM users WHERE id=?',[user.id], function (err, results) {
                if (err) done(err);
                if (!results[0]) done(err);
                var existedUser = results[0];
                done(null, existedUser);
            });
    });

    passport.use(new LocalStrategy({
            session: true
        },
        (username, password, done) => {
            console.log('LocalStrategy', username, password);
            db.query('SELECT * FROM users WHERE username = ?', [username], function (err, userInfo) {
                if (err) return done(err);
                // 1. 아이디가 존재하지 않는 경우
                if (!userInfo[0]) {
                    console.log('없는 계정');
                    return done(err);
                } else {
                    bcrypt.compare(password, userInfo[0].pwd, (err, result) => {
                        const user = userInfo[0];
                        if (err) return done(err);
                        if (!result) {
                            // 2. 비밀번호 틀린 경우
                            console.log('비번틀림');
                            return done(null, false);
                        } else {
                            // 3. login success
                            console.log('성공', user);
                            return done(null, user);
                        }
                    })
                }

            });
        }
    ));

    return passport;
}