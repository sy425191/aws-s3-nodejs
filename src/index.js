require('dotenv').config()
import express from 'express'

const app = express()

app.get('/', (req, res) => {
    res.send("ok Sir")
})

app.listen(process.env.PORT, ()=>{
    console.log(`AWS S3 Server Running on port: ${process.env.PORT}`)
})