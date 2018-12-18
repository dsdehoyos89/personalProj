const { DOMAIN, CLIENT_ID, CLIENT_SECRET, REACT_APP_CLIENT } = process.env;
const passport = require("passport");
const AuthStrategy = require("passport-auth0");

module.exports = app => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new AuthStrategy(
      {
        domain: DOMAIN,
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: "/login",
        scope: "openid email profile"
      },
      (_, __, ___, profile, done) => {
        done(null, profile);
      }
    )
  );

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

  passport.deserializeUser((user, done) => {
    return done(null, user);
  });

  app.get(
    "/login",
    passport.authenticate("auth0", {
      successRedirect: `/`,
      failureRedirect: "/login"
    })
  );

  const logout = (req, res) => {
    req.session.destroy(() => {
      res.redirect(REACT_APP_CLIENT + "/login");
    });
  };

  app.get("/api/logout", logout);

  app.get("/", (req, res) => {
    res.redirect(REACT_APP_CLIENT);
  });
};
