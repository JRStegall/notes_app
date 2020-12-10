const express = require('express');
const exphbs = require('express-handlebars');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const app = express();
const PORT = 3000;


//LOAD DOTENV CONFIG
dotenv.config();

connectDB();

//HANDLEBARS
app.engine('.hbs', exphbs({defaultLayout: 'main', 'extname' : '.hbs'}));
app.set('view engine', '.hbs');

app.listen(PORT, console.log(`Listening at port ${PORT}, I'm doing this!`));
