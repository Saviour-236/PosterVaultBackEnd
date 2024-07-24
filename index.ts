// create server with express
import express from 'express';
import cors from 'cors';
import connetDb from './dbConnection'
import cookieParser from 'cookie-parser';
import authorization from './middleware/authorization';
import postRoutes from './routes/postRoutes';
import adminRoutes from './routes/adminRoutes';
import authentcationRoutes from './routes/authenticationRoutes';
import 'dotenv/config'
const app = express();

// allowing to cors to a orgin to specfic origin
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true // Allow credentials (cookies, authorization headers)
}))
// connecting to database
connetDb();


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//routes using router
app.use('/post',postRoutes);
app.use('/admin',authorization,adminRoutes);
app.use('/auth',authentcationRoutes);



app.listen(process.env.PORT, () => {
    console.log('server is running on port ', process.env.PORT);
});