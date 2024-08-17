import mongoose from "mongoose";
import Post from "../modling/post_schema.ts";
import type { Request, Response } from 'express';
import uploadToCloudinary from "../utils/uploadToCloudinary.ts";
const getPosts = async (req: any, res: any) => {
    try {
        const posts = await Post.find();
        return res.status(200).json(posts);
    }
    catch (err) {
        console.log('errr when fetching from database')
        return res.status(500).json({ message: 'something went wrong' })
    }
}
const addPost = async (req: Request, res: Response) => {
    console.log("in add post controller");
    const post = req.body;
    console.log("this is file " , req.file);
    const result = await uploadToCloudinary(req.file);
    console.log("post uploaded to cloudinary and this is result as path string", result);
    post.imageUrl = result;
    const newPost = new Post(post);
    try {
        console.log('trying to save in database');
        const savedpost = await newPost.save();
        console.log('post saved in database');

        return res
        .status(200)
        .json({ user:savedpost, message: 'post added successfully' });
    }
    catch (err:any) {
        return res.status(500).json({ message: err.message });
    }
 }
const deletePost = async (req: Request, res: any) => { }
const updatePost = async (req: Request, res: any) => {
    return res.status(200).json({ message: 'post updated successfully' });
 }

export { getPosts, addPost, deletePost, updatePost }