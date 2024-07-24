// user shcema with user name , email , password, admin, with mongoose
import mongoose from "mongoose";

const UserOfTileSiteSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        trim:true
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
    admin:{
        type: Boolean,
        default:false
    },
    profilePic:{
        type:String,
        default:""
    }
})

const UserOfTileSite= mongoose.model("UserUserOfTilesSite", UserOfTileSiteSchema);

export default UserOfTileSite;