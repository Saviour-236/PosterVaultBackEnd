import express from 'express'
import type { Request, Response } from 'express';
import authorization from '../middleware/authorization';
const adminRouter = express.Router();

//admin route 
adminRouter.get('/checkauth/:token',authorization, (req: Request, res: Response) => {
    // console.log('admin route');
    return res.status(200).json({ message: 'welcome to admin panel' });
});


export default adminRouter;