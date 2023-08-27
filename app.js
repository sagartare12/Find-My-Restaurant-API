const express=require('express')
const app=express();

app.use(express.json())

require("./routes/restaurant.route")(app)
module.exports=app;