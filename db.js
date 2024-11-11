//it use to estabilish the connection between node.js server and db server
const mongoose = require('mongoose');

//define the MongoDB connection URL
const mongoUrl = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.3/hotels'  // 'hotels' is my db name and it can be changed44

//estabilish the connection
mongoose.connect(mongoUrl, {});

// declared one connection object to represents the Mongodb connection and we always use that
const  db = mongoose.connection;

//event listeners in DB Connections [ (.on('connected',...)) , (.on('error0',...)) , (.on('disconnected',...))]
db.on('connected', ()=>{
    console.log('Connected to MongoDB Server');
})

db.on('error', (err)=>{
    console.log('Error while connecting to MongoDB Server', err);
}) 

db.on('disconnected', ()=>{
    console.log('Disconnected from MongoDB Server');
})

module.exports = db;


