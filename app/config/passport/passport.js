var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport, user) {
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;
    //serialize
    passport.serializeUser(function(user, done) {
    done(null, user.id);
    });
    // deserialize
    passport.deserializeUser(function(id, done) {
        User.findById(id).then(function(user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });

//SIGNUP STRATEGY/////////////////////////////////////////
    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            var generateHash = function(password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };
            User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {
                if (user)
                {
                    return done(null, false, {
                        message: 'That email is already taken'
                    });
                } else {
                    var userPassword = generateHash(password);
                    var data =
                        {
                            email: email,
                            password: userPassword,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            serviceAddress: req.body.serviceAddress,
                            accountType: req.body.accountType,
                            accountStatus: req.body.accountStatus,
                            plan: req.body.plan,
                            binType: req.body.binType,
                            pickupDay: req.body.pickupDay,
                            mrr: req.body.mrr,
                            firstPickupDate: req.body.firstPickupDate,
                            nextPickupDate: req.body.nextPickupDate,
                            phone: req.body.phone,
                            dwelling: req.body.dwelling,
                            totalPickups: req.body.totalPickups,
                            daysUsing: req.body.daysUsing,
                            totalPoundage: req.body.totalPoundage,
                            scrapPoints: req.body.scrapPoints,
                        };
                    User.create(data).then(function(newUser, created) {
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                            return done(null, newUser);
                            console.log(newUser.firstname);
                        }
                    });
                }
            });
        }
    ));
//SIGN-IN STRATEGY//////////////////////////////////////////////////////
passport.use('local-signin', new LocalStrategy(
    {
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done) {
        var User = user;
        var isValidPassword = function(userpass, password) {
            return bCrypt.compareSync(password, userpass);
        }
        User.findOne({
            where: {
                email: email
            }
        }).then(function(user) {
            if (!user) {
                return done(null, false, {
                    message: 'Email does not exist'
                });
            }
            if (!isValidPassword(user.password, password)) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
            var userinfo = user.get();
            return done(null, userinfo);
            console.log(user.firstname);
        }).catch(function(err) {
            console.log("Error:", err);
            return done(null, false, {
                message: 'Something went wrong with your Signin'
            });
        });
    }
));
}