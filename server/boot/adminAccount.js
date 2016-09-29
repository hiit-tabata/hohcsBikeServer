'use strict';


module.exports = function(app) {
  var User = app.models.User;

  User.create([
    {username: 'admin', email: 'admin@holmantai.net', password: 'adminHolmantai'}
  ], function(err, users) {
    console.log(err);

    console.log('Created users:', users);
  });

};
