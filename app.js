const express = require('express');
const exphbs = require('express-handlebars');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/db');

const app = express();
const PORT = 3000;

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
    saveUninitialized: false
}))

//PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

//ROUTES
app.use('/',require('./routes/index'));
app.use('/auth',require('./routes/auth'));



app.listen(PORT, console.log(`Listening at port ${PORT}, I'm doing this!`));
