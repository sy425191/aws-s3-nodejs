import dotenv from "dotenv"
import connectDatabase from './db/index.js'
import {app} from './app.js'

dotenv.config({
    path: './.env'
})

connectDatabase()
.then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log('AWS S3 Server is running on PORT: ', process.env.PORT)
    })
})
.catch ((error)=>{
    process.exit()
})

