// require('dotenv').config({path: './env'})
import dotenv from "dotenv";
import connectDB from './db/index.js';
import { app } from "./app.js";

dotenv.config({path: './env'})


connectDB().then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
}).catch((error) => {
    console.error('Error connecting to the database:', error);
    process.exit(1); // Exit the process with failure
});


















// Uncomment the following lines if you want to use mongoose directly
// import mongoose from 'mongoose';
/*
import { DB_NAME } from './constants';

const app = express();

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        app.on('error', (error) => {
            console.error('Error connecting to the database:', error);
            throw error;
        });
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is running on port ${process.env.PORT || 3000}`);
        });
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
})()
*/