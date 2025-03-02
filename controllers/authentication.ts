import type { Request, Response } from 'express';
import User from '../modling/user_schema.ts';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { OAuth2Client } from "google-auth-library";
import { errorMonitor } from 'events';

// Handle sign-up controller
const signUp = async (req: Request, res: Response) => {
    // console.log(req.body)
    // console.log('in sign up controller', req.body);
    //check if user already exist or not
    const user = await User.findOne({ email: req.body.email });
    // console.log('user',user);
    if (user) {
        // console.log('user already exist');
        return res.status(400).json({ message: 'User already exist' });
    }
    // console.log('user not exist');
    //crypting password  using bcrypt 
    // console.log('before hashing password');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
    req.body.password = hashedPassword;
    // console.log('after hashing password');
    // create new user
    const newUser = new User(req.body); 
    // console.log('new user created');

    // save user in database getting only user without password
     const {password , ...savedUser} =  await newUser.save().then((user) => user.toObject());
    
    // token generation
    // console.log("saved user",savedUser);

    // console.log('before token generation');
    // console.log('jwt token secret key',process.env.JWT_TOKEN_SECRET_KEY);
    const accessToken = jwt.sign({user:savedUser}, process.env.JWT_TOKEN_SECRET_KEY as string, {expiresIn:'1h'});
    const refreshToken = jwt.sign({usre:savedUser}, process.env.JWT_TOKEN_SECRET_KEY as string, {expiresIn:'2d'});
    // console.log('after token generation');

    // sending resposne with token in cookies

    return res.status(200)
    .cookie('refreshToken',refreshToken,{
        httpOnly:true,
        maxAge: 172800000, // 2 days in milliseconds
        secure: true,
        sameSite: 'none',
    }).json({Accesstoken:accessToken,message:'sign up successfull'})
};



// sign in controller 
const signIn = async (req: Request, res: Response) => {
  
  
  
    // check if user exsit or not
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return (res.status(400).json({ message: ' User not found please sign up first' }));
    }


    // chek  password correct or not 
    if (! bcrypt.compare(req.body.password, user.password)) {
        return res.status(400).json({ message: ' wrong password ' })
    }

    const { password, ...userInfo } = user.toObject();
    // generate token
    const accessToken = jwt.sign( { userInfo }, 
        process.env.JWT_TOKEN_SECRET_KEY as string ,
        { expiresIn: '1h' }
    )
    // console.log('token', token);
    const refreshToken = jwt.sign({ userInfo }, process.env.JWT_TOKEN_SECRET_KEY as string, {expiresIn:'2d'});


    //send token in cookies
    return res
    .status(200)
    .cookie(
        'refreshToken', 
        refreshToken, {
        httpOnly: true,
        maxAge: 172800000, // 1 hour in milliseconds
        secure: true,
        sameSite: 'none',
      })
      .json({token:accessToken,message:"sign in successfull"});
};

const continueWithGoogle = async(req:Request,res:Response) => {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const { token } = req.body;
    try{
         // Verify Google ID Token
         const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const { name, email, picture } = ticket.getPayload();
        // check if user exist or not 
        let user = await User.findOne({email})
        // console.log('user',user);
        // console.log('user',user.toObject());
        if(!user){
            // create new user
            let [firstName, ...lastname] = name.split(' ');
            // console.log('first name',firstName);
            // console.log('last name',lastname);
            
            let newUser = new User({
                firstName: name,
                lastName: lastname.join(' '),
                email,
                profilePic: picture,
            });
            // console.log('new user',newUser);
          const savedUser =  await newUser.save();
        //   console.log("saved user ", savedUser);
         const accessToken = jwt.sign({user:savedUser}, process.env.JWT_TOKEN_SECRET_KEY as string, {expiresIn:'3h'});
        // console.log("token",accessToken);
          return res.status(200).send('user created successfully');
        }
        const accessToken = jwt.sign({ user }, process.env.JWT_TOKEN_SECRET_KEY as string, {expiresIn:'3h'});
        return res.status(200).send({token:accessToken,message:'loginned succesfully',user});        
    }catch(err){
        // console.log("errror in google authentication",err);
        res.status(400).send('error in google authentication');
    }
}

export {signIn, signUp, continueWithGoogle};
 