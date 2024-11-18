// user shcema with user name , email , password, admin, with mongoose
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required:true,
        trim:true
    },
    lastName:{
        type: String,
        required:true,
    },
    email: {
        type: String,
        required:true,
        trim:true,
        unique:true
    },
    password: {
        type: String,
        required:true
    },
    role:{
        type: String,
        default:"endUser"
    },
    profilePic:{
        type:String,
        default:""
    },
    phone:{
        type:String,
        default:""
    },
    address: {
       type:{
              street: String,
              city: String,
              state: String,
              pin: String,
              country: String
       },
       default: {
                street: "",
                city: "",
                state: "",
                pin: "",
                country: ""
       }
    },
    whishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Poster',
        default:[]
    }],
    cart:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Poster',
        default:[]
    }],
    orders:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Poster',
        default:[]
    }],
    verified: {
        type: Boolean,
        default: false,
    },
    purchaseHistory: [{
     date:{
        type: Date,
     },
     items:[{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Poster',
     }],
    }]
})

const User = mongoose.model("User", UserSchema);

export default User;