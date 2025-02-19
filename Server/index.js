import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js';
import PostRoute from './Routes/PostRoute.js';
import UploadRoute from './Routes/UploadRoute.js';

// Configure dotenv before using process.env
dotenv.config();

// Debug: Check if environment variables are loaded
console.log("MongoDB URI:", process.env.MONGO_DB);
console.log("PORT:", process.env.PORT);

// Initialize express app
const app = express();

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Static file serving
app.use(express.static('public'));
app.use('/images', express.static('images'));

// MongoDB Connection
const connectDB = async () => {
    try {
        if (!process.env.MONGO_DB) {
            throw new Error('MongoDB connection string is not defined in environment variables');
        }
        
        await mongoose.connect(process.env.MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB Connected Successfully");
        
        // Only start server after DB connection
        app.listen(process.env.PORT || 5000, () => 
            console.log(`Server running on port ${process.env.PORT || 5000}`)
        );
    } catch (error) {
        console.log("MongoDB Connection Error: ", error);
        process.exit(1);
    }
};

connectDB();

// Routes
app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/post', PostRoute);
app.use('/upload', UploadRoute);