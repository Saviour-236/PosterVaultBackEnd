// routes for post handling

import express from 'express';
import upload from '../middleware/multerForImgHandling';
//import type { Request, Response, NextFunction } from 'express';
import { getPosts, addPost, deletePost, updatePost } from '../controllers/posts';
import authorization from '../middleware/authorization';
const router = express.Router();

router.get('/get',getPosts);
router.post('/addNewPost',authorization,upload.single('image'),addPost);
router.delete('/deletePost',authorization,deletePost);
router.put('/updatePost',authorization,updatePost);

export default router;