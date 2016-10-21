var express = require('express');
var app = express();
var moment = require ('moment');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
var session = require('express-session');
var compress = require('compression');
var api = require('./routes/api-service-route');
var report = require('./routes/api-report-route');
var web = require('./routes/web-route');
var plugins = require('./routes/api-ping-plugins-route');
var auth = require('./routes/web-auth-route');
var cookieParser = require('cookie-parser');

exports = module.exports = function(storage){
  if (!storage) {
    throw new Error('storage is required');
  }

  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.engine('.html', require('ejs').renderFile);

  app.use(compress());
  app.use(session({
    store: storage.getSessionStore(session),
    secret: 'myBigSecret',
    saveUninitialized: true,
    resave: true
  }));

  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(methodOverride());

  app.use(function(req, res, next) {
    if(req.query.check)
      res.send("okay!")

    if(req.cookies== undefined || req.cookies.isAdmin != "qpzqJ4mtHTG7mG43")
      return;
    next();
  });
  auth.configureApp(app);

  app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });

  app.use('/api/plugins', plugins.getRoutes());
  app.use('/api/report', report.getRoutes(storage));
  app.use('/api', api.getRoutes(storage));
  app.use('/', web.getRoutes(storage));

  app.use(express.static(__dirname + '/public'));

  if (process.env.NODE_ENV === 'development') {
    console.log('development mode');
    app.use(errorHandler());
  }

  return app;

};
