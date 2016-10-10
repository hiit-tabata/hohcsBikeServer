'use strict';


module.exports = function(app) {
  var Client = app.models.Client;

  Client.create([
    {username: 'user', email: 'user@user.user', password: 'user'}
  ], function(err, users) {
    if(err) console.log(err);
    else console.log('Created users:', users);
  });

};
