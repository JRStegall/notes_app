const express = require('express');
const exphbs = require('express-handlebars');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const connectDB = require('./config/db');
const methodOverride = require('method-override');
const { delete } = require('request');

const app = express();
const PORT = 3000;

app.use(require('morgan')('dev'));

//BODY PARSER
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//PASSPORT CONFIG
require('./config/passport')(passport);

//LOAD DOTENV CONFIG
dotenv.config();
connectDB();

//HANDLEBARS
app.engine('.hbs', exphbs({defaultLayout: 'main', 'extname' : '.hbs'}));
app.set('view engine', '.hbs');

//EXPRESS SESSIONS MIDDLEWARE
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection : mongoose.connection }),
}))

//PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

//OVERRIDE MIDDLEWARE
app.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body){
        //LOOK IN URLENCODED POST BODIES AND DELETE IT
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

//ROUTES
app.use('/',require('./routes/index'));
app.use('/auth',require('./routes/auth'));
app.use('/notes',require('./routes/notes'));



app.listen(PORT, console.log(`Listening at port ${PORT}, I'm doing this!`));
