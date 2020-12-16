const express = require('express');
const exphbs = require('express-handlebars');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const connectDB = require('./config/db');
const formatDate = require('./helpers/formatDate.js');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(require('morgan')('dev'));

app.use(express.static('public'));

//BODY PARSER
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//OVERRIDE MIDDLEWARE
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        //LOOK IN URLENCODED POST BODIES AND DELETE IT
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

//PASSPORT CONFIG
require('./config/passport')(passport);

//LOAD DOTENV CONFIG
dotenv.config();
connectDB();

//HANDLEBARS
app.engine('.hbs',
    exphbs({
        defaultLayout: 'main',
        extname: '.hbs',
        helpers: { formatDate },
    }),
);
app.set('view engine', '.hbs');

//EXPRESS SESSIONS MIDDLEWARE
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
}))

//PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());



//ROUTES
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/notes', require('./routes/notes'));



app.listen(PORT, console.log(`Listening at port ${PORT}, I'm doing this!`));
