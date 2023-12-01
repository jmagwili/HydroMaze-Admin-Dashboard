import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { databaseInit } from './database.js'

const app = express()
const port = 3000

dotenv.config()
databaseInit()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.listen(port, console.log(`App is running \nListening to port ${port}`))