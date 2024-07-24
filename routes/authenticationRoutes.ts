// authentication routes 
import express from "express";
import { signIn, signUp } from '../controllers/authentication';

const authentcationRoutes = express.Router();

authentcationRoutes.post('/signUp',signUp);
authentcationRoutes.post('/signIn', signIn);

export default authentcationRoutes;