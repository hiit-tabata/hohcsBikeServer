'use strict';


module.exports = function(app) {
  var User = app.models.user;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;
  var Team = app.models.Team;

  User.create([
    {username: 'admin', email: 'admin@holmantai.net', password: 'adminHolmantai'}
  ], function(err, users) {
    if (err) throw err;

    console.log('Created users:', users);


  });
};
