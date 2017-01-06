var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');
var connexion = require('./routes/connexion');
var inscription = require('./routes/inscription');
var deconnexion = require('./routes/deconnexion');

var compte = require('./routes/compte');

var about = require('./routes/about');
var contact = require('./routes/contact');
var mescaves = require('./routes/mescaves');
var macave = require('./routes/macave');
var addcave = require('./routes/addcave');
var mesvins = require('./routes/mesvins');
var addvins = require('./routes/addvins');
var recherche = require('./routes/recherche');
var profil = require('./routes/profil');

var app = express();
require('dotenv').config();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'ssshhhhh'}));

app.use('/', index);
app.use('/users', users);
app.use('/connexion', connexion);
app.use('/inscription', inscription);
app.use('/deconnexion', deconnexion);

app.use('/compte', compte);

app.use('/about', about);
app.use('/contact', contact);

app.use('/compte', mescaves);
app.use('/compte', macave);
app.use('/compte', addcave);
app.use('/compte', mesvins);
app.use('/addvins', addvins);
app.use('/recherche', recherche);
app.use('/profil', profil);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
