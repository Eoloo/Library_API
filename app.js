// Imports
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
//console.log(process.env)
mongoose.set('strictQuery', true);

const libraryRoutes = require('./routes/books');

// Initialize express
const app = express();
app.use(express.json());

app.use('/books', libraryRoutes);

// Connecting to the Database
const connectionString= process.env.DATABASE_URL;
mongoose.connect(connectionString);

const database=mongoose.connection;

// Check Connection
database.once('open', ()=>{
   console.log('Database connected successfully')
})

// Check for DB Errors
database.on('error', (error)=>{
   console.log(error);
})

const PORT = process.env.PORT;


app.listen(PORT, function(){
   console.log(`Server is listening on port ${PORT}`)
});



