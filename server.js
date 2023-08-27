const app = require('./app')
const mongoose= require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path: './config.env'});

mongoose.connect(process.env.DB_URL)
const db=mongoose.connection;

db.on('error',()=>{
    console.log("Error while connecting to the database")
})

db.once('open',()=>{
    console.log('Connected to the DATABASE')
})

const server=app.listen(process.env.PORT,()=>{
    console.log(`App running on PORT:${process.env.PORT}`)
})