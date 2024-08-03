// src/functions/index.js

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// import serverless from 'serverless-http';

// Import your modules and routes
import connetDb from './dbConnection';
import authorization from './middleware/authorization';
import postRoutes from './routes/postRoutes';
import adminRoutes from './routes/adminRoutes';
import authentcationRoutes from './routes/authenticationRoutes';

// Initialize the app
const app = express();

// Middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        "https://texotiles.netlify.app"
    ],
    credentials: true // Allow credentials (cookies, authorization headers)
}));


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
connetDb();

// Define routes
app.use('/post', postRoutes);
app.use('/admin', authorization, adminRoutes);
app.use('/auth', authentcationRoutes);



// // Export handler for serverless function
// export const handler = serverless(app);
