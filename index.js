import express from 'express';
import mysql from 'mysql';
import { config } from 'dotenv';
import pool from './db/db_connection.js';
import userRouter from './routes/userRoute.js';

// Initialize Express app
config();
const app = express();
const port = process.env.port;
app.use(express.urlencoded({extended: true}));
app.use(express.json());

pool.getConnection((error, connection)=>{
    if(error){
        throw error;
    }
    console.log(`Database connected!`);
    connection.release();
})


app.use('/', userRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
