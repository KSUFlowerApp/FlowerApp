// routes/userRoutes.js

var session = require('../middleware/session.js');

module.exports = function(app, passport, db) {
  // =====================================
  // USER = PROFILE ===============================
  // =====================================
  // pass session.isLoggedIn function to make sure a user is logged in
  /*app.get('/user/profile', session.isLoggedIn, function(req, res) {
    res.render('user/profile.ejs');
  });*/

  // =====================================
  // USER = SETTINGS ===============================
  // =====================================
  app.get('/user/settings', session.isLoggedIn, function(req, res) {
    res.render('user/settings.ejs', {message: req.flash('settingsMessage')});
  });

  // UPDATE PASSWORD
  app.post('/user/settings', session.isLoggedIn, function(req, res) {
    var currentPassword = req.body.currentPassword;
    var newPassword = req.body.newPassword;
    var confirmNewPassword = req.body.confirmNewPassword;

    var crypto = require('crypto');
    db.query("SELECT * FROM users WHERE username = '" + req.app.locals.user.username + "'", function(err, rows) {
      if(err) {
        throw err;
      } else {
        if(newPassword != confirmNewPassword) {
          req.flash('settingsMessage', 'Oops! Passwords do not match.'); // create the loginMessage and save it to session as flashdata
        } else if (!(rows[0].password == crypto.createHmac('sha256',rows[0].salt).update(currentPassword).digest('hex'))) {
          req.flash('settingsMessage', 'Oops! Wrong password.'); // create the loginMessage and save it to session as flashdata
        } else {
          newPassword = crypto.createHmac('sha256',rows[0].salt).update(newPassword).digest('hex');
          db.query("UPDATE users SET password='" + newPassword + "' WHERE id=" + req.app.locals.user.id, function(err2, rows2) {
            if(err2) {
              throw err2;
            }
          });
          req.flash('settingsMessage', 'Password updated successfully!');
        }
      }
      res.redirect('back');
    });
  });
};
