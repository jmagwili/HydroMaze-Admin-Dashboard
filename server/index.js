import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { databaseInit } from './database.js'
import mongoose, { mongo } from 'mongoose'
import {client} from './database.js'


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




app.get('/fetch-data', async (req, res) => {
    try {
        // Fetch data from the collection
        
        await client.connect();
        const database = client.db('Water-Refilling-Management-System');
        const orders = database.collection('orders');
        const findResult = await orders.find({}).toArray();
console.log('Found documents =>', findResult);// Fetch all documents
    
        res.json(findResult); // Send retrieved data as JSON response
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



app.listen(port, console.log(`App is running \nListening to port ${port}`))