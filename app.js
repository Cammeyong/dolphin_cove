const port = process.env.PORT || 8080;
var path = require('path');
var express = require('express');
var flash = require('express-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyparser = require('body-parser');
var mysql = require('mysql');
var app = express();
var bcrypt = require('bcrypt');

var conn = require('./lib/db');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname)));


var indexRoute = require('./routes/index');
var bookingRoute = require('./routes/booking');
var register_tour_comRoute = require('./routes/register_tour_com');
var manage_tour_comRoute = require('./routes/manage_tour_com');
var auth_registerRoute = require('./routes/auth_register');
var manage_bookingRoute = require('./routes/manage_booking');
var loginRoute = require('./routes/login');
var packagesRoute = require('./routes/packages');



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(session({ 
    secret: 'secREt$#code$%3245',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 6*60*10000 }
}))

app.use(flash());

//routing middleware
app.use(manage_bookingRoute);
app.use(loginRoute);
app.use(packagesRoute);
app.use(auth_registerRoute);
app.use(manage_tour_comRoute);
app.use(register_tour_comRoute);
app.use(bookingRoute),
app.use('/', indexRoute);

app.listen(port, () => console.log(`Listening on port ${port}..`));
