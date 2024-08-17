import express from 'express'
import type { Request, Response } from 'express';
import authorization from '../middleware/authorization';
const adminRouter = express.Router();

// checking if user is admin and logged in or not
adminRouter.get('/checkAuth',authorization,(req:Request,res:Response)=>{
    return res.status(200).send('ok')
})

//admin route 
adminRouter.get('/', (req: Request, res: Response) => {
   // console.log('admin route');
    return res.status(200).send('admin route')
});
export default adminRouter;