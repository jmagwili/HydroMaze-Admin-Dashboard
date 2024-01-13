import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import mongoose, { mongo } from 'mongoose'
dotenv.config()

const url = process.env.VITE_DATABASE_URI;

export const databaseInit = () => {
    mongoose.connect(url)
        .then(() => {
            console.log('CONNECTED TO THE DATABASE');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error.message);
        });
};

const ordersSchema = new mongoose.Schema({ 
    round: Number,
    slim: Number,
    total: Number,
    isOwned: Boolean,
    status: String,
    username: String,
});

export const Orders = mongoose.model('Order', ordersSchema, 'orders');
export const Customers = mongoose.model('Customer', new mongoose.Schema(), 'users');

