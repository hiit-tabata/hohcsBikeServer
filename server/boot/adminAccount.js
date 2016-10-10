'use strict';


module.exports = function(app) {
  var User = app.models.User;

  User.create([
    {username: 'admin1', email: 'admin@holmantai.net', password: 'adminHolmantai'},
    {username: 'admin', email: 'admin@admin.admin', password: 'admin'}
  ], function(err, users) {
    console.log(err);
    console.log('Created users:', users);
  });

};
