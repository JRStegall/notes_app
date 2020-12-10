const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const exphbs = require('express-handlebars');
const app = express();
const PORT = 3000;


//LOAD DOTENV CONFIG
dotenv.config();

connectDB();

//HANDLEBARS
app.engine('.hbs', exphbs({defaultLayout: 'main', 'extname' : '.hbs'}));
app.set('view engine', '.hbs');

app.listen(PORT, console.log(`Listening at port ${PORT}, I'm doing this!`));
