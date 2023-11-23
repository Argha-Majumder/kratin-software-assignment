const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;

app.use('/', require('./routes'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, (err) => {
    if (err) {
        console.log(`Error in running the server ${port}`);
    }
    console.log(`Server is running on port ${port}`);
});