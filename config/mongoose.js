const mongoose = require('mongoose');

const DB = process.env.DATABASE_URL;

mongoose.connect(DB)
    .then(()=>console.log("Connection successful"))
    .catch((err)=>console.log(`Connection problem ${err}`));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error connecting to mongodb'));
db.once('open',()=>console.log('Connected to mongodb'));

module.exports = db;