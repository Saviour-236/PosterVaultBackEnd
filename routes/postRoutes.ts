// routes for post handling

import express from 'express';
import upload from '../middleware/multerForImgHandling';
//import type { Request, Response, NextFunction } from 'express';
import { getPosts, addPost, deletePost, updatePost } from '../controllers/posts';
import authorization from '../middleware/authorization';
const postRouter = express.Router();

postRouter.get('/get',getPosts);
postRouter.post('/addNewPost',authorization,upload.single('image'),addPost);
postRouter.delete('/deletePost',authorization,deletePost);
postRouter.put('/updatePost',authorization,upload.single('image'),updatePost);


export default postRouter;