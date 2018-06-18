var authController = require('../controllers/authcontroller.js');
 
 
module.exports = function(app, passport) {
    app.get('/signup', authController.signup);
    app.get('/signin', authController.signin);
    app.get('/dashboard',isLoggedIn, authController.dashboard);

    app.get('/logout',authController.logout);
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/signin');
    };
    
    app.post('/signup', function(req, res, next) {
      passport.authenticate('local-signup', function(err, user, info) {
        console.log('authenticate user', user);
        if (err) { return next(err); }
        if (!user) { return res.redirect('/local-signup'); }
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          //return res.redirect('/dashboard');
            return res.render('dashboard', { user: user });
        });
      })(req, res, next);
    });

  app.post('/signin', function(req, res, next) {
    passport.authenticate('local-signin', function(err, user, info) {
      console.log('authenticate user', user);
      if (err) { return next(err); }
      if (!user) { return res.redirect('/local-signin'); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        //return res.redirect('/dashboard');
          return res.render('dashboard', { user: user });
      });
    })(req, res, next);
  });

}