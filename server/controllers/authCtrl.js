const { DOMAIN, CLIENT_ID, CLIENT_SECRET, REACT_APP_CLIENT } = process.env
const passport = require('passport');
const AuthStrategy = require('passport-auth0');

module.exports = app => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new AuthStrategy(
        {
            domain: DOMAIN,
            clientID: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            callbackURL: '/login',
            scope: 'openid email profile'
        },
        (_, __, ___, profile, done) => {
            // console.log('PROFILE.iid IN AUTHCTRL', profile.id, profile.nickname, profile.emails[0].value)
            done(null, profile)

        }
    ));


    // passport.serializeUser((user, done) => done(null, user));

    //add req.session to state or redux 
    //implement redux 

    passport.serializeUser((profile, done) => {
        // console.log("passport in searialize user", profile);
        const db = app.get("db");
        db.getUser(profile.id).then(user => {
            if (!user[0]) {
                db.addUser([profile.emails[0].value, profile.nickname, profile.id])
                    .then(response => {
                        // console.log("Response in authctrl", response);
                        return done(null, response[0]);
                    })
                    .catch(err => console.log(err));
            } else {
                return done(null, user[0]);
            }
        });
    });

    //     // passport.serializeUser((user, done) => {
    //     //     console.log(user, "User in authCtrl")
    //     //     app
    //     //         .get("db")
    //     //         .getUser(user.profile_id)
    //     //         .then(response => {
    //     //             if (!response[0]) {
    //     //                 app
    //     //                     .get("db")
    //     //                     .adduser([
    //     //                         email,
    //     //                         profile_name,
    //     //                         profile_id
    //     //                     ])
    //     //                     .then(res => {
    //     //                         return done(null, res[0]);
    //     //                     })
    //     //                     .catch(err => console.log(err));
    //     //             } else {
    //     //                 return done(null, response[0]);
    //     //             }
    //     //         })
    //     //         .catch(err => console.log(err));
    //     // });

    passport.deserializeUser((user, done) => {
        return done(null, user);
    });




    //     // passport.serializeUser((user, done) => done(null, user));
    //     passport.deserializeUser((profile, done) => done(null, profile));

    app.get(
        "/login",
        passport.authenticate('auth0', {
            successRedirect: `/`,
            failureRedirect: '/login'
        })
    );


    const logout = (req, res) => {
        req.session.destroy(() => {
            res.redirect(REACT_APP_CLIENT + '/public')
        })
    }

    app.get('/api/logout', logout);


    //     app.get('/api/test', (req, res) => res.status(200).json(req.session))



    app.get('/', (req, res) => {
        // req.session.user_id = req.user.profile_id
        // req.session.user = 'we added something to the session'
        // console.log(req.user)
        // console.log("AUTHCTRL REQ.USER", req.session);
        res.redirect(REACT_APP_CLIENT)
    });


};