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
const corsOptions = {
    origin: ['http://localhost:5173', 'https://poster-vault-project-1.netlify.app'],
    credentials: true, // Allow credentials (cookies, authorization headers)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  //  allowedHeaders: ['Content-Type', 'Authorization'], // Add any other headers you might need
};

// Apply CORS globally with the specified options
app.use(cors(corsOptions));

// Handle preflight requests automatically
app.options('*', cors(corsOptions));


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
connetDb();

// Define routes
app.use('/post', postRoutes); // for post handling
app.use('/auth', authentcationRoutes); // for authentication
app.use('/admin',adminRoutes); // for chenking the user is admin or not


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

