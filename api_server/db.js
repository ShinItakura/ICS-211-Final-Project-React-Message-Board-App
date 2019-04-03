const mongoose = require('mongoose');

let dbURI = 'mongodb://localhost:27017/msgsdb';
mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true });

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to ' + dbURI );
});

mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error ' + err );
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

require('./models/message_schema');
require('./models/user_schema');