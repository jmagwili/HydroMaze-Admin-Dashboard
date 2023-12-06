import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import mongoose, { mongo } from 'mongoose'
dotenv.config()

const url = process.env.VITE_DATABASE_URI;

export const databaseInit = () => {
    mongoose.connect(url)
    const db = mongoose.connection
    db.on('error', (error) => console.error(error))
    db.once('open', ()=>console.log('CONNECTED TO THE DATABASE'))
}

export const Order = mongoose.model('Order', new mongoose.Schema(), 'orders');

