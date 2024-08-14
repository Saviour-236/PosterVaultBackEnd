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
// app.use(cors({
//     origin: [
//         'http://localhost:5173',            // Local development
//         'https://texotiles.netlify.app'     // Production front-end
//     ],
//     credentials: true,                     // Allow credentials (cookies, headers, etc.)
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
// }));

app.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:5173', 'https://texotiles.netlify.app'];
    const origin = req.headers.origin;
    
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
connetDb();

// Define routes
app.use('/post', postRoutes);
app.use('/admin', authorization, adminRoutes);
app.use('/auth', authentcationRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

// // Export handler for serverless function
// export const handler = serverless(app);
