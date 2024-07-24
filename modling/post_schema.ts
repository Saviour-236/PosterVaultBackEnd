// creating post schema which is a img with tile and discription and price tag
import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    title:  {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        required: true,
        default:0,
    },
    price: {
        type: Number,
        required: true
    },
    alt:{
        type: String,
        required: true,
    },
    author:{
        type:String,
        required:true,
        default:'unknown'
    },
    enable:{
        type:Boolean,
        required:true,
        default:true,
    }
})

const Post = mongoose.model('post',postSchema)

export default Post