const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');

const saasMiddleware = require('node-sass-middleware');
//const path = require('path');

app.use(saasMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css' 
}));
app.use(express.urlencoded());
app.use(express.static("./assets"));

// layouts and partials and views
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.set('view engine', 'ejs');
app.set('views', './views');

// use express router 
app.use('/', require('./routes'));

app.listen(port, (err) => {
    if (err) {
        console.log(`Error in running the server ${port}`);
    }
    console.log(`Server is running on port ${port}`);
});