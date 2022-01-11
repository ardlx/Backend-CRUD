const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const port =2022
const routes = require('./routes/controller')



app.use('/',routes)
app.listen(port,() =>{
    console.log(`Server is listening to port ${port}`)
})